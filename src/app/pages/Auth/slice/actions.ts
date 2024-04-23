import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'app/services';
import { serializeAxiosError } from 'store/reducer.utils';
import { ILogin } from 'types';

const login = createAsyncThunk(
  'auth/login',
  async (data: ILogin) => {
    return AuthService.login(data);
  },
  { serializeError: serializeAxiosError },
);

export default { login };
