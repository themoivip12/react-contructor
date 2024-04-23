import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { path } from 'app/routes/path';

import { AuthService, LocalStorageService } from '..';

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean; // is true if you want to self handle access denied exception
  }
}

export const createService = (
  baseURL?: string,
  contentType: string = 'application/json',
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};
export const createServiceFormData = (
  baseURL?: string,
  contentType: string = 'multipart/form-data',
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

export const downloadFileService = (
  baseURL?: string,
  contentType: string = 'application/json',
): AxiosInstance => {
  const config: AxiosRequestConfig = baseConfig(baseURL, contentType);
  config.responseType = 'blob';
  return interceptAuth(config);
};

const baseConfig = (
  baseURL?: string,
  contentType: string = 'application/json',
) => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': contentType,
    },
  };
};

const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);

  instance.interceptors.request.use(cf => {
    const token = LocalStorageService.get<string>(
      LocalStorageService.OAUTH_TOKEN,
    );

    if (token && cf?.headers) {
      cf.headers['Authorization'] = 'BEAR ' + token;
    }

    return cf;
  });
  instance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    error => {
      if (error.response.status === 401) {
        getNewToken(
          error,
          () =>
            (window.location.href = `${path.login}#${window.location.pathname}${window.location.search}`),
        );
      }

      // Do something with response error
      return Promise.reject(error);
    },
  );
  return instance;
};

export const createServiceNoToken = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(config => {
    return config;
  });
  return instance;
};

const getNewToken = async (error: any, logout: Function) => {
  const refreshToken = LocalStorageService.get<string>(
    LocalStorageService.REFRESH_TOKEN,
  );
  if (!refreshToken) {
    logout();
    return;
  }
  try {
    const { data } = await AuthService.refreshToken(refreshToken);
    LocalStorageService.set(LocalStorageService.OAUTH_TOKEN, data.token);
    error.config.headers = {
      Authorization: 'BEAR ' + data.token,
    };
    return axios(error.config as any);
  } catch (error) {
    logout();
    return;
  }
};
