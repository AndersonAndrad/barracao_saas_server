import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FilterInventoryStockHistory } from '../../interfaces/inventory-stock-history.interface';

@Injectable()
export class FilterInventoryStockHistoryDto implements FilterInventoryStockHistory {
  @ApiProperty({ description: 'Page to search by items', example: 1 })
  page: number;

  @ApiProperty({ description: 'Size of items to return in the same page', example: 10 })
  size: number;
}
