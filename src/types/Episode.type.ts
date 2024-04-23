import { EPISODE_ORDER } from './Enum';

export interface IEpisode {
  content_images: { order: number; image: string }[];
  uuid: string;
  title: string;
  description: string;
  episode_order: number;
  episode_status: number;
  views_count: number;
  daliy_increase_amount: number;
  rank: number;
  rank_count: number;
  rejected_at: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  represent_image_large: string;
  represent_image_medium: string;
  represent_image_small: string;
  work: number;
}

export interface IEpisodeSubmit {
  work?: string;
  title?: string;
  description?: string;
  episode_order?: EPISODE_ORDER;
  represent_image?: File | string;
  content_file?: File | string;
  represent_image_large?: string;
  represent_image_medium?: string;
  represent_image_small?: string;
  represent_image_large_file?: File;
  represent_image_medium_file?: File;
  represent_image_small_file?: File;
}
