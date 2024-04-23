import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WorkService } from 'app/services';
import { createService } from 'app/services/api/axios';
import { serializeAxiosError } from 'store/reducer.utils';

export const searchComicThunk = createAsyncThunk(
  'main/search',
  async () => {
    return WorkService.searchComic();
  },
  { serializeError: serializeAxiosError },
);
