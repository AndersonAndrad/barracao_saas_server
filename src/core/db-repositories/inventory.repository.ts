import { CrudTemplate } from '../../shared/templates/crud.template';
import { Inventory, StockHistory } from '../interfaces/inventory.interface';

export interface InventoryRepository extends CrudTemplate<Inventory> {
  syncStockHistory(entityId: string, stockHistory: StockHistory): Promise<Inventory>;
}
