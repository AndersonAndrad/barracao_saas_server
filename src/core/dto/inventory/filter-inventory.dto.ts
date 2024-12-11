import { Injectable } from '@nestjs/common';
import { FilterInventory } from '../../interfaces/inventory.interface';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class FilterInventoryDto implements FilterInventory {
  @ApiProperty({ description: 'Page to search by items', example: 1 })
  page: number;

  @ApiProperty({ description: 'Size of items to return in the same page', example: 10 })
  size: number;
}
