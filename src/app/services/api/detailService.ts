import { FilterParams, IPageable, IWork } from 'types';
import { IEpisode } from 'types/Episode.type';

import { createService } from './axios';

const instance = createService(process.env.REACT_APP_API_URL);

const getDetailWork = async (data: {
  id: string;
  type: string;
}): Promise<IWork> => {
  const url = `/v2/charbet-house/${data.type}/${data.id}/`;
  const result = await instance.get(url);

  return result.data.data;
};

const getListEpisode = async (
  params: FilterParams,
): Promise<IPageable<IEpisode>> => {
  const { typeOfWork, ...rest } = params;
  const url = `/v2/charbet-house/${typeOfWork}/episode/`;
  const result = await instance.get(url, { params });
  return result.data;
};
const getListNotice = async (
  params: FilterParams,
): Promise<IPageable<IEpisode>> => {
  const { typeOfWork, ...rest } = params;
  const url = `/v2/charbet-house/${typeOfWork}/notice/`;
  const result = await instance.get(url, { params });
  return result.data;
};

export default { getDetailWork, getListEpisode, getListNotice };
