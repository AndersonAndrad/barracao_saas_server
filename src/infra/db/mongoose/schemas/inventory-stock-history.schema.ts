import mongoose from 'mongoose';
import { StockHistory } from '../../../../core/interfaces/inventory-stock-history.interface';

const inventoryStockHistory = new mongoose.Schema<Omit<StockHistory, '_id>'>>(
  {
    beforeUpdate: { type: Number },
    quantityChanged: { type: Number },
    inventoryItemId: { type: String },
    total: { type: Number },
  },
  { timestamps: true },
);

export const InventoryStockHistoryModel: mongoose.Model<Omit<StockHistory, '_id'>> = mongoose.model<
  Omit<StockHistory, '_id'>
>('inventoryStockHistory', inventoryStockHistory);
