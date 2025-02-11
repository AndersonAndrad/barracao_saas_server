import { UserCrudService } from '@app/application/user/services/user-crud.service';
import { MonthlyFeeRepository } from '@app/core/db-repositories/monthlyFee.repository';
import { CreateMonthlyFeeDto } from '@app/core/dto/monthlyFee/create-monthlyFee.dto';
import { MonthlyFee, MonthlyFeeStatus } from '@app/core/interfaces/monthlyFee.interface';
import { PaginationResponse } from '@app/core/interfaces/pagination.interface';
import { MonthlyFeeRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-monthlyFee.repository';
import { CrudTemplate } from '@app/shared/templates/crud.template';
import { generateHash } from '@app/shared/utils/base64.utils';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MonthlyFeeCrudService implements CrudTemplate<MonthlyFee> {
  constructor(
    @Inject(MonthlyFeeRepositorySymbol) private readonly monthlyFeeRepository: MonthlyFeeRepository,
    private readonly userService: UserCrudService,
  ) { }

  async create(entity: CreateMonthlyFeeDto): Promise<MonthlyFee> {
    const user = await this.userService.findOne(entity.userId);

    if (!user) throw new ConflictException('User does not found');

    const monthlyFee: Partial<MonthlyFee> = {
      ...entity,
      code: generateHash().slice(0, 12),
      status: MonthlyFeeStatus.PENDING,
      user,
    };

    return await this.monthlyFeeRepository.create(monthlyFee);
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
