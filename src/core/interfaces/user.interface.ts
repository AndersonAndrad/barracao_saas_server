import { PaginationRequest } from './pagination.interface';

export interface User {
  _id: string;
  name: string;
  alias: string;
  phone: string;
  email: string;
  birthday: Date;
  password: string;
  status: UserStatus;
  color: string;
  avatar: string;
}

export enum UserStatus {
  NEW = 'new',
  ENABLE = 'enabled',
  DISABLED = 'disabled',
  AWAY = 'away',
}

export interface FilterUser extends PaginationRequest {
  word?: string;
}

export interface UpdatePassword {
  password: string;
  newPassword: string;
  confirmationPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export enum UserErrors {
  NOT_FOUND = 'This user can not be founded',
  UNAUTHORIZED = 'Your user can not be access this action',
  UNAUTHORIZED_PASSWORD = 'Passwords do not match',
}
