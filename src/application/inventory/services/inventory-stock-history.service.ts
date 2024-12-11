import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-inventory.repository';
import { InventoryRepository } from '../../../core/db-repositories/inventory.repository';
import { Inventory } from '../../../core/interfaces/inventory.interface';

@Injectable()
export class InventoryStockHistoryService {
  constructor(@Inject(InventoryRepositorySymbol) private readonly inventoryRepository: InventoryRepository) {}

  async syncStockHistoryByCreation(item: Inventory): Promise<Inventory> {
    return item;
  }

  async syncStockHistoryByUpdate(item: Inventory): Promise<Inventory> {
    return item;
  }
}
