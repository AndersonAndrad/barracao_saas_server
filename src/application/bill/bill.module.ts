import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './services/crud-bill.service';
import {
  BillRepositorySymbol,
  MongooseBillRepository,
} from '../../infra/db/mongoose/repositories/mongoose-bill.repository';

@Module({
  controllers: [BillController],
  imports: [],
  providers: [BillService, { provide: BillRepositorySymbol, useClass: MongooseBillRepository }],
  exports: [BillService],
})
export class BillModule {}
