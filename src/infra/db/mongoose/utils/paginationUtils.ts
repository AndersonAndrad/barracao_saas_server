import { PaginationObj } from '../../../../core/interfaces/pagination.interface';

export const paginationUtils = (filter: any, totalOfDocs: number): PaginationObj => {
  const skip: number = (filter.page - 1) * filter.size;

  const total: number = totalOfDocs ? Math.ceil(totalOfDocs / filter.size) : 0;

  return { skip, total };
};
