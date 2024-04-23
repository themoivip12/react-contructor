export interface IPageable<T> {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  results: T[];
}
