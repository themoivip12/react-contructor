import { WHETHER_THE_WORK } from 'types';
import { IEpisode } from 'types/Episode.type';

import { createService } from './axios';

const instance = createService(process.env.REACT_APP_API_URL);

const instanceFormData = createService(
  process.env.REACT_APP_API_URL,
  'multipart/form-data',
);

const createEpisode = async (file: FormData): Promise<IEpisode> => {
  const isNovel = file.get('type') === WHETHER_THE_WORK.NOVEL;
  const url = isNovel
    ? `/v2/charbet-house/novel/episode/`
    : `/v2/charbet-house/comic/episode/`;

  const result = await instanceFormData.post(url, file);

  return result.data.data;
};

const updateEpisode = async (file: FormData): Promise<IEpisode> => {
  const isNovel = file.get('type') === WHETHER_THE_WORK.NOVEL;
  const url = isNovel
    ? `/v2/charbet-house/novel/episode/${file.get('uuid')}/`
    : `/v2/charbet-house/comic/episode/${file.get('uuid')}/`;

  const result = await instanceFormData.put(url, file);

  return result.data.data;
};

const getDetailEpisode = async (data: { epId: string; type: string }) => {
  const url = `/v2/charbet-house/${data.type}/episode/${data.epId}/`;

  const result = await instanceFormData.get(url);

  return result.data.data;
};

const deleteEpisode = async (epId: string) => {
  const url = `/v2/charbet-house/comic/episode/${epId}/`;

  const result = await instance.delete(url);
  return result.data;
};

export default {
  createEpisode,
  updateEpisode,
  getDetailEpisode,
  deleteEpisode,
};
