import { IPagination } from './pagination.interface';

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}
