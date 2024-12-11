import mongoose from 'mongoose';
import {
  Inventory,
  InventoryCategory,
  InventoryStatus,
  Measurement,
} from '../../../../core/interfaces/inventory.interface';

const inventorySchema = new mongoose.Schema<Omit<Inventory, '_id'>>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String },
  category: { type: String, required: true, enum: InventoryCategory },
  status: { type: String, required: true, enum: InventoryStatus },
  quantityStock: { type: Number },
  reorderLevel: { type: Number },
  reorderQuantity: { type: Number },
  dateAdded: { type: Date },
  lastUpdated: { type: Date },
  unitMeasure: { type: String, enum: Measurement },
  expirationDate: { type: Date },
});

export const InventoryModel: mongoose.Model<Omit<Inventory, '_id'>> = mongoose.model('inventory', inventorySchema);
