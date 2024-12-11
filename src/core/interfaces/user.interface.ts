import { PaginationRequest } from './pagination.interface';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface FilterUser extends PaginationRequest {}
