import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryCrudService } from './services/inventory-crud.service';
import {
  InventoryRepositorySymbol,
  MongooseInventoryRepository,
} from '../../infra/db/mongoose/repositories/mongoose-inventory.repository';
import { InventoryStockHistoryModule } from '../inventory-stock-history/inventory-stock-history.module';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryCrudService,
    {
      provide: InventoryRepositorySymbol,
      useClass: MongooseInventoryRepository,
    },
  ],
  imports: [InventoryStockHistoryModule],
  exports: [InventoryCrudService],
})
export class InventoryModule {}
