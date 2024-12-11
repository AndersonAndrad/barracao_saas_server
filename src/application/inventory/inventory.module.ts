import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryCrudService } from './services/inventory-crud.service';
import {
  InventoryRepositorySymbol,
  MongooseInventoryRepository,
} from '../../infra/db/mongoose/repositories/mongoose-inventory.repository';
import { InventoryStockHistoryService } from './services/inventory-stock-history.service';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryCrudService,
    InventoryStockHistoryService,
    {
      provide: InventoryRepositorySymbol,
      useClass: MongooseInventoryRepository,
    },
  ],
  imports: [],
  exports: [InventoryCrudService],
})
export class InventoryModule {}
