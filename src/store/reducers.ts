/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, SerializedError } from '@reduxjs/toolkit';
import mainReducer from 'app/pages/Main/slice';
import authReducer from 'app/pages/Auth/slice';
import { AxiosError } from 'axios';

import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const compareReducer = {
  main: mainReducer,
  auth: authReducer,
};
const commonErrorProperties: Array<keyof SerializedError> = [
  'name',
  'message',
  'stack',
  'code',
];
