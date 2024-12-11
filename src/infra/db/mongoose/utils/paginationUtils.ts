import { PaginationObj } from '../../../../core/interfaces/pagination.interface';

export const paginationUtils = (filter: any, totalOfDocs: number): PaginationObj => {
  const skip: number = ((filter?.page ?? 1) - 1) * (filter?.size ?? 0);

  const total: number = totalOfDocs;

  return { skip, total };
};
