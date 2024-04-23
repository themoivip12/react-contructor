import {
  AnyAction,
  AsyncThunk,
  ActionReducerMapBuilder,
  createSlice,
  SerializedError,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

/**
 * Model for redux actions with pagination
 */
export type IQueryParams = {
  players?: Array<number>;
  query?: string;
  page?: number;
  size?: number;
  sort?: string;
  id?: number;
  playerId?: number;
  clubId?: number;
  leagueId?: number;
  unitStandardId?: number;
  type?: string;
  name?: string;
  birthDate?: string;
};

export type ISearchObjectParams = {
  query?: string;
  page?: number;
  size?: number;
  sort?: string;
  id?: string;
  payload?: any;
};

/**
 * Useful types for working with actions
 */
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

/**
 * Check if the async action type is rejected
 */
export function isRejectedAction(action: AnyAction) {
  return action.type.endsWith('/rejected');
}

/**
 * Check if the async action type is pending
 */
export function isPendingAction(action: AnyAction) {
  return action.type.endsWith('/pending');
}

/**
 * Check if the async action type is completed
 */
export function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith('/fulfilled');
}

const commonErrorProperties: Array<keyof SerializedError> = [
  'name',
  'message',
  'stack',
  'code',
];

/**
 * serialize function used for async action errors,
 * since the default function from Redux Toolkit strips useful info from axios errors
 */
export const serializeAxiosError = (
  value: any,
): AxiosError | SerializedError => {
  if (typeof value === 'object' && value !== null) {
    if (value.isAxiosError) {
      return value;
    } else {
      const simpleError: SerializedError = {};
      for (const property of commonErrorProperties) {
        if (typeof value[property] === 'string') {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};

export interface EntityState<T> {
  loading: boolean;
  errorMessage: string | null;
  entities: ReadonlyArray<T>;
  entity: T;
  links?: any;
  updating: boolean;
  totalItems?: number;
  updateSuccess: boolean;
  deleteSuccess?: boolean;
  dataUploadFile?: any;
  deletePlayerSuccess?: string;
  createPlayerSuccess?: string;
  createPlayerFail?: string;
  type?: string;
  createSuccess?: boolean;
  saveSuccess?: boolean;
  referee?: any;
  playerFreeOwner?: any;
  playerFreeAway?: any;
  playerFieldsOwner?: any;
  playerReserveOwner?: any;
  playerFieldsAway?: any;
  playerReserveAway?: any;
  save?: boolean;
  refereeDetail?: any;
  matchRateDetail?: any;
  matchStatusDetail?: any;
  saveRecord?: boolean;
  listWeather?: any;
  getStatus?: any;
  listTV?: any;
  var?: any;
  avar?: any;
  reviewer?: any;
  tsg?: any;
  matchBasic?: any;
}

export interface Pageable<T> {
  content: T[];
  total?: number;
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  sort?: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort: string[];
  };
  empty?: boolean;
}

/**
 * A wrapper on top of createSlice from Redux Toolkit to extract
 * common reducers and matchers used by entities
 */

export const upLoadImg = (body: FormData) => {
  return axios.post<any>(`api/file/upload-file`, body);
};

export const getImage = (imageName: string, uploadType: string) => {
  return axios.get<any>(
    `api/file/get-file-minio?fileName=${imageName}&uploadType=${uploadType}`,
  );
};

export const UploadType = {
  AVATAR_CLUB: 'AVATAR_CLUB',
  AVATAR_PLAYER: 'AVATAR_PLAYER',
  AVATAR_LEAGUE_STANDARD: 'AVATAR_LEAGUE_STANDARD',
  AVATAR_UNIT_STANDARD: 'AVATAR_UNIT_STANDARD',
  OTHER: 'OTHER',
  ATTACHMENT: 'ATTACHMENT',
};

export const LanguageType = {
  VIETNAM: 'vi',
  ENGLISH: 'en',
  KOREAN: 'ko',
};
