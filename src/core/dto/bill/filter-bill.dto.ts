import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FilterBill } from '../../interfaces/bill.interface';

@Injectable()
export class FilterBillDto implements FilterBill {
  @ApiProperty({ description: 'Page to search by items', example: 1 })
  page: number;

  @ApiProperty({ description: 'Size of items to return in the same page', example: 10 })
  size: number;
}
