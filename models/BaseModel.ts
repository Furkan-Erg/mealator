export interface BaseModel<T> {
  data: T;
  errorMessage: string;
  success: boolean;
}
