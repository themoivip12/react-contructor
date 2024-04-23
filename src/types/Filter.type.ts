export interface FilterParams {
  page_size?: number;
  page?: number;
  work?: string;
  typeOfWork?: string;
}

export interface FilterAsyncSelectParams extends Record<string, unknown> {
  page_size?: number;
  page?: number;
  keyWork?: string;
}
