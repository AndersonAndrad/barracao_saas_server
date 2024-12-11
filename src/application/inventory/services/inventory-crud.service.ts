import { Inject, Injectable } from '@nestjs/common';
import { CrudTemplate } from '../../../shared/templates/crud.template';
import { FilterInventory, Inventory } from '../../../core/interfaces/inventory.interface';
import { PaginationResponse } from '../../../core/interfaces/pagination.interface';
import { InventoryRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-inventory.repository';
import { InventoryRepository } from '../../../core/db-repositories/inventory.repository';
import { CreateInventoryDto } from '../../../core/dto/inventory/create-inventory.dto';
import { InventoryStockHistoryService } from './inventory-stock-history.service';

@Injectable()
export class InventoryCrudService implements CrudTemplate<Inventory> {
  constructor(
    @Inject(InventoryRepositorySymbol) private readonly inventoryRepository: InventoryRepository,
    private readonly inventoryStockHistory: InventoryStockHistoryService,
  ) {}

  async create(entity: CreateInventoryDto): Promise<Inventory> {
    let item = await this.inventoryRepository.create({
      ...entity,
      stockHistory: [],
      dateAdded: new Date(),
      lastUpdated: new Date(),
    });

    item = await this.inventoryStockHistory.syncStockHistoryByCreation(item);

    return item;
  }

  async deleteOne(entityId: string): Promise<void> {
    await this.inventoryRepository.deleteOne(entityId);
  }

  async findOne(entityId: string): Promise<Inventory> {
    return this.inventoryRepository.findOne(entityId);
  }

  async find(filter: FilterInventory): Promise<PaginationResponse<Inventory>> {
    return this.inventoryRepository.find(filter);
  }

  async updateOne(entityId: string, entity: Partial<Omit<Inventory, '_id'>>): Promise<Inventory> {
    const item: Inventory = await this.inventoryRepository.updateOne(entityId, { ...entity, lastUpdated: new Date() });

    return await this.inventoryStockHistory.syncStockHistoryByUpdate(item);
  }
}
