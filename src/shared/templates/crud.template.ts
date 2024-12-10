export interface CrudTemplate<T> {
  create(entity: Omit<T, '_id'>): Promise<T>;

  findOne(entityId: string): Promise<T>;

  updateOne(entityId: string, entity: Partial<Omit<T, '_id'>>): Promise<T>;

  deleteOne(entityId: string): Promise<void>;
}
