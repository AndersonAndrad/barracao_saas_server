import { MonthlyFeeRepository } from '@app/core/db-repositories/monthlyFee.repository';
import { CreateMonthlyFeeDto } from '@app/core/dto/monthlyFee/create-monthlyFee.dto';
import { MonthlyFee } from '@app/core/interfaces/monthlyFee.interface';
import { PaginationResponse } from '@app/core/interfaces/pagination.interface';
import { MonthlyFeeRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-monthlyFee.repository';
import { CrudTemplate } from '@app/shared/templates/crud.template';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MonthlyFeeCrudService implements CrudTemplate<MonthlyFee> {
  constructor(
    @Inject(MonthlyFeeRepositorySymbol) private readonly monthlyFeeRepository: MonthlyFeeRepository,
  ) { }

  async create(entity: CreateMonthlyFeeDto): Promise<MonthlyFee> {
    return await this.monthlyFeeRepository.create(entity);
  }

  async findOne(entityId: string): Promise<any> {
    return await this.monthlyFeeRepository.findOne(entityId);
  }

  async updateOne(entityId: string, entity: Partial<Omit<MonthlyFee, '_id'>>): Promise<MonthlyFee> {
    return await this.monthlyFeeRepository.updateOne(entityId, entity);
  }

  async deleteOne(entityId: string): Promise<void> {
    return await this.monthlyFeeRepository.deleteOne(entityId);
  }

  async find(filter: any): Promise<PaginationResponse<MonthlyFee>> {
    return await this.monthlyFeeRepository.find(filter);
  }
}
