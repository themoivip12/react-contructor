import {
  ICategory,
  IKeyword,
  IPageable,
  IWork,
  RestResult,
  WHETHER_THE_WORK,
} from 'types';
import { FilterParams } from 'types/Filter.type';

import { createService, createServiceNoToken } from './axios';

const instance = createService(process.env.REACT_APP_API_URL);

const instanceFormData = createService(
  process.env.REACT_APP_API_URL,
  'multipart/form-data',
);

const instanceNoToken = createServiceNoToken(process.env.REACT_APP_API_URL);

const searchComic = async (): Promise<RestResult<IPageable<IWork>>> => {
  const url = `/v2/charbet-house/comic/?&page_size=10&page=1`;
  console.log(instance.get(url));

  return instance.get(url);
};

const searchNovel = async (): Promise<IPageable<IWork>> => {
  const url = `/v2/charbet-house/novel/?&page_size=10&page=1`;

  const result = await instance.get(url);

  return result.data;
};

const searchCategories = async (): Promise<ICategory[]> => {
  const url = `/v1/works/category/`;

  const result = await instanceNoToken.get(url);

  return result.data.data;
};

const searchKeywords = async (
  params: FilterParams,
): Promise<IPageable<IKeyword>> => {
  const url = `/v1/works/keyword/`;

  const result = await instance.get(url, { params });

  return result.data;
};

const createWork = async (file: FormData): Promise<IPageable<IKeyword>> => {
  const isNovel = file.get('type') === WHETHER_THE_WORK.NOVEL;
  console.log(33, isNovel);

  const url = isNovel ? `/v2/charbet-house/novel/` : `/v2/charbet-house/comic/`;

  const result = await instanceFormData.post(url, file);

  return result.data;
};

const getDetailWork = async (data: { id: string; type: string }) => {
  const isNovel = data.type === WHETHER_THE_WORK.NOVEL;
  const url = isNovel
    ? `/v2/charbet-house/novel/${data.id}/`
    : `/v2/charbet-house/comic/${data.id}/`;

  const result = await instanceFormData.get(url);

  return result.data.data;
};

const updateWork = async (file: FormData): Promise<IPageable<IKeyword>> => {
  const id = file.get('uuid');

  const isNovel = file.get('type') === WHETHER_THE_WORK.NOVEL;
  const url = isNovel
    ? `/v2/charbet-house/novel/${id}/`
    : `/v2/charbet-house/comic/${id}/`;

  const result = await instanceFormData.put(url, file);

  return result.data;
};

export default {
  searchComic,
  searchNovel,
  searchCategories,
  searchKeywords,
  createWork,
  getDetailWork,
  updateWork,
};
