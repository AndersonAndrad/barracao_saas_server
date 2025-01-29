import { PaginationResponse } from '../../core/interfaces/pagination.interface';

export interface CrudTemplate<T> {
  create(entity: Omit<any, '_id'>): Promise<T>;

  findOne(entityId: string): Promise<any>;

  updateOne(entityId: string, entity: Partial<Omit<T, '_id'>>): Promise<T>;

  deleteOne(entityId: string): Promise<void>;

  find(filter: any): Promise<PaginationResponse<T>>;
}
