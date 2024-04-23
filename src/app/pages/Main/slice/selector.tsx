import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from '.';

const selector = (root: RootState) => root?.main || initialState;

export const mainSelector = createSelector([selector], state => state);
