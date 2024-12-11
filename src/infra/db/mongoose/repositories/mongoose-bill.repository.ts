import { Injectable } from '@nestjs/common';
import { BillRepository } from '../../../../core/db-repositories/bill.repository';
import { Bill } from '../../../../core/interfaces/bill.interface';
import { PaginationResponse } from '../../../../core/interfaces/pagination.interface';
import { BillModel } from '../schemas/bill.schema';
import { dispatchError, formatMongoDocuments } from '../utils/mongoDocuments.utils';
import { paginationUtils } from '../utils/paginationUtils';

export const BillRepositorySymbol = Symbol('BillRepositoryDb');

@Injectable()
export class MongooseBillRepository implements BillRepository {
  async create(entity: Omit<any, '_id'>): Promise<Bill> {
    const bill = await BillModel.create(entity);

    return formatMongoDocuments(bill);
  }

  async deleteOne(entityId: string): Promise<void> {
    await BillModel.deleteOne({ _id: entityId });
  }

  async find(filter: any): Promise<PaginationResponse<Bill>> {
    const totalDocs: number = await BillModel.countDocuments();

    const { skip, total } = paginationUtils(filter, totalDocs);

    const items = await BillModel.find().skip(skip).limit(filter.size).exec();

    return {
      items: formatMongoDocuments(items),
      total,
    };
  }

  async findOne(entityId: string): Promise<Bill> {
    try {
      const bill = await BillModel.findOne({ _id: entityId });

      return formatMongoDocuments<Bill>(bill);
    } catch (error) {
      dispatchError({
        moduleName: 'Bill',
        errorMessage: error.message,
        complement: entityId,
      });
    }
  }

  async updateOne(entityId: string, entity: Partial<Omit<Bill, '_id'>>): Promise<Bill> {
    await BillModel.updateOne({ _id: entityId }, entity);

    return await this.findOne(entityId);
  }
}
