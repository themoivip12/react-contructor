import { IUser } from 'types';

import { createService } from './axios';

const instance = createService(process.env.REACT_APP_API_URL);

const getUser = (id: string) => {
  const url = `/user/${id}`;
  return instance.get<{ token: string; refresh_token: string }>(url);
};

const createNewUser = (data: IUser) => {
  const url = `/user`;
  return instance.post<IUser>(url, data);
};

export default { getUser, createNewUser };
