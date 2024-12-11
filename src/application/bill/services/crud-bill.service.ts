import { Inject, Injectable } from '@nestjs/common';
import { BillRepository } from '../../../core/db-repositories/bill.repository';
import { Bill } from '../../../core/interfaces/bill.interface';
import { PaginationResponse } from '../../../core/interfaces/pagination.interface';
import { BillRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-bill.repository';

@Injectable()
export class BillService implements BillRepository {
  constructor(@Inject(BillRepositorySymbol) private readonly billRepository: BillRepository) {}

  async create(entity: Omit<any, '_id'>): Promise<Bill> {
    return await this.billRepository.create(entity);
  }

  async deleteOne(entityId: string): Promise<void> {
    await this.billRepository.deleteOne(entityId);
  }

  async find(filter: any): Promise<PaginationResponse<Bill>> {
    return await this.billRepository.find(filter);
  }

  async findOne(entityId: string): Promise<Bill> {
    return await this.billRepository.findOne(entityId);
  }

  async updateOne(entityId: string, entity: Partial<Omit<Bill, '_id'>>): Promise<Bill> {
    return this.billRepository.updateOne(entityId, entity);
  }
}
