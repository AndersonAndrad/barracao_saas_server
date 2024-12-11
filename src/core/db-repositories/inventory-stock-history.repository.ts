import { CrudTemplate } from '../../shared/templates/crud.template';
import { StockHistory } from '../interfaces/inventory-stock-history.interface';

export interface InventoryStockHistoryRepository extends Pick<CrudTemplate<StockHistory>, 'create' | 'find'> {
  lastHistory(inventoryItemId: string): Promise<StockHistory[]>;
}
