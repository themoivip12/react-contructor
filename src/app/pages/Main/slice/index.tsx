import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WorkService } from 'app/services';

import { MainState } from './type';

export const searchComicThunk = createAsyncThunk('main/search', async () => {
  return WorkService.searchComic();
});

export const initialState: MainState = {
  count: 0,
  categories: [],
};

const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchComicThunk.fulfilled, (state, action) => {
        state.comicPageable = action.payload.data;
      })
      .addCase(searchComicThunk.pending, state => {})
      .addCase(searchComicThunk.rejected, (state, action) => {});
  },
});

export const { actions } = slice;
export default slice.reducer;
