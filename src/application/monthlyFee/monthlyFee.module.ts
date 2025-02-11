import {
  MongooseMonthlyFeeRepository,
  MonthlyFeeRepositorySymbol,
} from '@app/infra/db/mongoose/repositories/mongoose-monthlyFee.repository';

import { Module } from '@nestjs/common';
import { MonthlyFeeController } from './monthlyFee.controller';
import { MonthlyFeeCrudService } from './services/monthlyFee-crud.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  exports: [MonthlyFeeCrudService],
  controllers: [MonthlyFeeController],
  providers: [
    MonthlyFeeCrudService,
    { provide: MonthlyFeeRepositorySymbol, useClass: MongooseMonthlyFeeRepository },
  ],
})
export class MonthlyFeeModule { }
