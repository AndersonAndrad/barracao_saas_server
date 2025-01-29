import { MonthlyFee, MonthlyFeePayment } from '@app/core/interfaces/monthlyFee.interface';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { MonthlyFeeRepository } from '@app/core/db-repositories/monthlyFee.repository';
import { PaginationResponse } from '@app/core/interfaces/pagination.interface';
import { MonthlyFeeModel } from '../schemas/monthlyFee.schema';
import { formatMongoDocuments } from '../utils/mongoDocuments.utils';

export const MonthlyFeeRepositorySymbol = Symbol('MonthlyFeeRepository');

@Injectable()
export class MongooseMonthlyFeeRepository implements MonthlyFeeRepository {
  monthlyFeePayment(props: MonthlyFeePayment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Omit<any, '_id'>): Promise<MonthlyFee> {
    const monthlyFee = await MonthlyFeeModel.create(entity);

    if (!monthlyFee) throw new ConflictException();

    return formatMongoDocuments(monthlyFee);
  }

  async findOne(entityId: string): Promise<any> {
    const monthlyFee = await MonthlyFeeModel.findOne({ _id: entityId });

    if (!monthlyFee) throw new NotFoundException();

    return formatMongoDocuments(monthlyFee);
  }

  async updateOne(entityId: string, entity: Partial<Omit<MonthlyFee, '_id'>>): Promise<MonthlyFee> {
    await MonthlyFeeModel.updateOne({ _id: entityId }, entity);

    const monthlyFee = await MonthlyFeeModel.findOne({ _id: entityId });

    return formatMongoDocuments(monthlyFee);
  }

  async deleteOne(entityId: string): Promise<void> {
    await MonthlyFeeModel.deleteOne({ _id: entityId });
  }

  async find(filter: any): Promise<PaginationResponse<MonthlyFee>> {
    return {
      items: [],
      total: 0,
    };
  }
}
