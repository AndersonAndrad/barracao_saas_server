import { PaginationRequest } from './pagination.interface';

export interface StockHistory {
  _id: string;
  inventoryItemId: string;
  beforeUpdate: number;
  quantityChanged: number;
  total: number;
}

export interface FilterInventoryStockHistory extends PaginationRequest {}
