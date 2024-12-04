import { Document } from 'mongoose';

export const formatMongoDocuments = <T>(
  document: Document<T> | Document<T>[],
): T => {
  return JSON.parse(JSON.stringify(document));
};
