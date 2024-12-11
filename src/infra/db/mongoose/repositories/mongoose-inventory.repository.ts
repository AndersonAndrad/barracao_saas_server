import { InventoryRepository } from '../../../../core/db-repositories/inventory.repository';
import { FilterInventory, Inventory } from '../../../../core/interfaces/inventory.interface';
import { PaginationResponse } from '../../../../core/interfaces/pagination.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { dispatchError, formatMongoDocuments } from '../utils/mongoDocuments.utils';
import { InventoryModel } from '../schemas/inventory.schema';
import { paginationUtils } from '../utils/paginationUtils';
import { StockHistory } from '../../../../core/interfaces/inventory-stock-history.interface';

export const InventoryRepositorySymbol = Symbol('InventoryRepositoryDb');

@Injectable()
export class MongooseInventoryRepository implements InventoryRepository {
  async syncStockHistory(entityId: string, stockHistory: StockHistory): Promise<Inventory> {
    const updateWriteOpResult = await InventoryModel.updateOne(
      { _id: entityId },
      {
        $push: {
          stockHistory: {
            $each: [stockHistory],
            $position: 0,
          },
        },
      },
    );

    if (!updateWriteOpResult.modifiedCount) return;

    return await this.findOne(entityId);
  }

  async create(entity: Omit<Inventory, '_id'>): Promise<Inventory> {
    const item = await InventoryModel.create(entity);

    return formatMongoDocuments(item);
  }

  async deleteOne(entityId: string): Promise<void> {
    await InventoryModel.deleteOne({ _id: entityId });
  }

  async findOne(entityId: string): Promise<Inventory> {
    try {
      const item = await InventoryModel.findOne({ _id: entityId });

      if (!item) throw new NotFoundException(`Item with id ${entityId} not found`);

      return formatMongoDocuments(item);
    } catch (error) {
      dispatchError({
        moduleName: 'Inventory',
        errorMessage: error.message,
        complement: entityId,
      });
    }
  }

  async find(filter: FilterInventory): Promise<PaginationResponse<Inventory>> {
    const totalDocs: number = await InventoryModel.countDocuments();

    const { skip, total } = paginationUtils(filter, totalDocs);

    const items = await InventoryModel.find().skip(skip).limit(filter.size).exec();

    return {
      items: formatMongoDocuments(items),
      total,
    };
  }

  async updateOne(entityId: string, entity: Partial<Omit<Inventory, '_id'>>): Promise<Inventory> {
    try {
      await InventoryModel.updateOne({ _id: entityId }, entity);

      const item = await InventoryModel.findOne({ _id: entityId });

      return formatMongoDocuments(item);
    } catch (error) {
      dispatchError({
        moduleName: 'Inventory',
        errorMessage: error.message,
        complement: entityId,
      });
    }
  }
}
