import { ICategory, IKeyword, IPageable, IWork } from 'types';

export interface MainState {
  count: number;
  comicPageable?: IPageable<IWork>;
  novelPageable?: IPageable<IWork>;
  categories: ICategory[];
  keywordPageable?: IPageable<IKeyword>;
  workDetail?: IUpdateWorkForm;
}

export interface ICreateWorkForm {
  represent_image_medium_file?: File;
  represent_image_large_file?: File;
  represent_image_small_file?: File;
  represent_image?: File;
}

export interface IUpdateWorkForm {
  represent_image_medium_file?: File;
  represent_image_large_file?: File;
  represent_image_small_file?: File;
  represent_image?: File;
  title: string;
  uuid: string;
  short_description?: string;
  description?: string;
  publish_days: number[];
  category: number;
  publish_type: number;
  represent_image_large: string;
  represent_image_medium: string;
  represent_image_small: string;
  keywords: number[];
}
