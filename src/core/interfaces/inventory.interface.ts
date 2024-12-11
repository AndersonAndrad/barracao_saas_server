import { PaginationRequest } from './pagination.interface';

export interface Inventory {
  _id: string;
  name: string;
  description: string;
  category: InventoryCategory;
  quantityStock: number;
  reorderQuantity: number;
  reorderLevel: number;
  unitMeasure?: Measurement;
  dateAdded: Date;
  lastUpdated: Date;
  status: InventoryStatus;
  expirationDate?: Date;
  code: string;
}

export interface FilterInventory extends PaginationRequest {}

export enum InventoryCategory {
  ELECTRONIC = 'electronic',
  ANIMALS = 'animals',
  FOOD = 'food',
  CLEANING = 'cleaning',
  UTILITIES = 'utilities',
}

export enum Measurement {
  KG = 'kg',
  MG = 'mg',
}

export enum InventoryStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  SOLD = 'sold',
  DIED = 'died',
}
