import { LocalStorageService } from 'app/services';

export const isAuthenticated = () => {
  const accessToken = LocalStorageService.get<string>(
    LocalStorageService.OAUTH_TOKEN,
  );
  // return !!accessToken && accessToken.length > 0;
  return true;
};
