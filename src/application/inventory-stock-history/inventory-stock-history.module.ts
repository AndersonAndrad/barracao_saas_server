import { Module } from '@nestjs/common';
import { SyncInventoryStockHistoryService } from './services/sync-inventory-stock-history.service';
import {
  InventoryStockHistorySymbol,
  MongooseInventoryStockHistoryRepository,
} from '../../infra/db/mongoose/repositories/mongoose-inventory-stock-history.repository';
import { InventoryStockHistoryController } from './inventory-stock-history.controller';

@Module({
  controllers: [InventoryStockHistoryController],
  providers: [
    SyncInventoryStockHistoryService,
    {
      provide: InventoryStockHistorySymbol,
      useClass: MongooseInventoryStockHistoryRepository,
    },
  ],
  exports: [SyncInventoryStockHistoryService],
})
export class InventoryStockHistoryModule {}
