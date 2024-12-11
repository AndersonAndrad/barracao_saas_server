import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-inventory.repository';
import { InventoryRepository } from '../../../core/db-repositories/inventory.repository';
import { Inventory, StockHistory } from '../../../core/interfaces/inventory.interface';

@Injectable()
export class InventoryStockHistoryService {
  constructor(@Inject(InventoryRepositorySymbol) private readonly inventoryRepository: InventoryRepository) {}

  async syncStockHistoryByCreation(item: Inventory): Promise<Inventory> {
    const stockHistory: StockHistory = {
      total: item.quantityStock,
      beforeUpdate: item.quantityStock,
      quantityChanged: item.quantityStock,
    };

    return await this.inventoryRepository.syncStockHistory(item._id, stockHistory);
  }

  async syncStockHistoryByUpdate(item: Inventory): Promise<Inventory> {
    const [{ total }] = item.stockHistory;

    const stockHistory: StockHistory = {
      total: item.quantityStock,
      beforeUpdate: total,
      quantityChanged: item.quantityStock - total,
    };

    return await this.inventoryRepository.syncStockHistory(item._id, stockHistory);
  }
}
