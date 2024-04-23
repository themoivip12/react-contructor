import { ILogin } from 'types';

import { createService, createServiceNoToken } from './axios';

const instanceNoToken = createServiceNoToken(process.env.REACT_APP_API_URL);
const instance = createService(process.env.REACT_APP_API_URL);

const login = (data: ILogin) => {
  const url = '/auth/login';
  return instance.post<{ token: string; refresh_token: string }>(url, data);
};

const refreshToken = (refresh_token: string) => {
  const url = '/auth/refresh-token';
  return instanceNoToken.post<{ token: string }>(url, { refresh_token });
};
export default { login, refreshToken };
