import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from 'app/services';
import { notification } from 'antd';

import AuthActionThunk from './actions';

const slice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AuthActionThunk.login.fulfilled, (state, action) => {
        LocalStorageService.set(
          LocalStorageService.REFRESH_TOKEN,
          action.payload.data.refresh_token,
        );
        LocalStorageService.set(
          LocalStorageService.OAUTH_TOKEN,
          action.payload.data.token,
        );
      })
      .addCase(AuthActionThunk.login.rejected, (state, err: any) => {
        notification.error({ message: err.error.response.data.error });
      });
  },
});

export default slice.reducer;
