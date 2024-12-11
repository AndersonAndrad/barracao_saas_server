import { CrudTemplate } from '../../shared/templates/crud.template';
import { Inventory } from '../interfaces/inventory.interface';

export interface InventoryRepository extends CrudTemplate<Inventory> {}
