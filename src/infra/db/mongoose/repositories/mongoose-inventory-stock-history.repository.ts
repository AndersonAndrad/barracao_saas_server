import { Injectable } from '@nestjs/common';
import { InventoryStockHistoryRepository } from '../../../../core/db-repositories/inventory-stock-history.repository';
import { StockHistory } from '../../../../core/interfaces/inventory-stock-history.interface';
import { InventoryStockHistoryModel } from '../schemas/inventory-stock-history.schema';
import { formatMongoDocuments } from '../utils/mongoDocuments.utils';
import { PaginationResponse } from '../../../../core/interfaces/pagination.interface';
import { paginationUtils } from '../utils/paginationUtils';

export const InventoryStockHistorySymbol = Symbol('InventoryStockHistoryDb');

@Injectable()
export class MongooseInventoryStockHistoryRepository implements InventoryStockHistoryRepository {
  async create(entity: Omit<any, '_id'>): Promise<StockHistory> {
    const history = await InventoryStockHistoryModel.create(entity);

    return formatMongoDocuments(history);
  }

  async lastHistory(inventoryItemId: string): Promise<StockHistory[]> {
    const history = await InventoryStockHistoryModel.find({ inventoryItemId }).sort({
      createdAt: -1,
    });

    return formatMongoDocuments(history ?? []);
  }

  async find(filter: any): Promise<PaginationResponse<StockHistory>> {
    const totalDocs: number = await InventoryStockHistoryModel.countDocuments();

    const { skip, total } = paginationUtils(filter, totalDocs);

    const items = await InventoryStockHistoryModel.find()
      .skip(skip)
      .limit(filter.size)
      .sort({ createdAt: -1 })
      .exec();

    return {
      items: formatMongoDocuments(items),
      total,
    };
  }
}
