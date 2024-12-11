import { Inventory } from '../../interfaces/inventory.interface';

export class UpdateInventoryDto
  implements Partial<Omit<Inventory, '_id' | 'dateAdded' | 'lastUpdated' | 'stockHistory'>> {}
