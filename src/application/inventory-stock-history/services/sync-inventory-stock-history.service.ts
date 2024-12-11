import { Inject, Injectable } from '@nestjs/common';
import { Inventory } from '../../../core/interfaces/inventory.interface';
import { InventoryStockHistorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-inventory-stock-history.repository';
import { InventoryStockHistoryRepository } from '../../../core/db-repositories/inventory-stock-history.repository';
import { StockHistory } from '../../../core/interfaces/inventory-stock-history.interface';
import { CrudTemplate } from '../../../shared/templates/crud.template';
import { PaginationResponse } from '../../../core/interfaces/pagination.interface';

@Injectable()
export class SyncInventoryStockHistoryService implements Pick<CrudTemplate<StockHistory>, 'find'> {
  constructor(
    @Inject(InventoryStockHistorySymbol)
    private readonly inventoryStockHistoryRepository: InventoryStockHistoryRepository,
  ) {}

  async create(inventoryItem: Inventory): Promise<void> {
    const lastHistory = await this.inventoryStockHistoryRepository.lastHistory(inventoryItem._id);

    let stockHistory: Omit<StockHistory, '_id'> = {
      total: 0,
      beforeUpdate: 0,
      quantityChanged: 0,
      inventoryItemId: inventoryItem._id,
    };

    if (lastHistory.length) {
      const [{ total }] = lastHistory;

      stockHistory = {
        ...stockHistory,
        total: inventoryItem.quantityStock,
        beforeUpdate: total,
        quantityChanged: inventoryItem.quantityStock - total,
      };
    } else {
      stockHistory = {
        ...stockHistory,
        total: inventoryItem.quantityStock,
        beforeUpdate: inventoryItem.quantityStock,
        quantityChanged: inventoryItem.quantityStock,
      };
    }

    await this.inventoryStockHistoryRepository.create(stockHistory);
  }

  async find(filter: any): Promise<PaginationResponse<StockHistory>> {
    return this.inventoryStockHistoryRepository.find(filter);
  }
}
