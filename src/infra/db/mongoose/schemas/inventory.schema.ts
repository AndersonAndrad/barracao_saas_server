import mongoose from 'mongoose';
import {
  Inventory,
  InventoryCategory,
  InventoryStatus,
  Measurement,
  StockHistory,
} from '../../../../core/interfaces/inventory.interface';

const StockHistorySchema = new mongoose.Schema<StockHistory>({
  beforeUpdate: { type: Number },
  quantityAdded: { type: Number },
  total: { type: Number },
});

const inventorySchema = new mongoose.Schema<Omit<Inventory, '_id'>>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String },
  category: { type: String, required: true, enum: InventoryCategory },
  status: { type: String, required: true, enum: InventoryStatus },
  quantityStock: { type: Number },
  reorderLevel: { type: Number },
  reorderQuantity: { type: Number },
  stockHistory: { type: [StockHistorySchema] },
  dateAdded: { type: Date },
  lastUpdated: { type: Date },
  unitMeasure: { type: String, enum: Measurement },
  expirationDate: { type: Date },
});

export const InventoryModel: mongoose.Model<Omit<Inventory, '_id'>> = mongoose.model('inventory', inventorySchema);
