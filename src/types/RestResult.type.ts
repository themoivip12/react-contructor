export interface RestResult<T> {
  data: T;
  message: string;
  messages: string[];
  status: string;
  code?: number;
}
