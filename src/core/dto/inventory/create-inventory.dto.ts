import { Inventory, InventoryCategory, InventoryStatus } from '../../interfaces/inventory.interface';
import { util } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Omit = util.Omit;

export class CreateInventoryDto implements Omit<Inventory, '_id' | 'dateAdded' | 'lastUpdated' | 'stockHistory'> {
  @ApiProperty({ description: 'Category of the inventory item, example: Electronic' })
  @IsEnum(InventoryCategory)
  @IsNotEmpty()
  category: InventoryCategory;

  @ApiProperty({ description: 'Code of the inventory item, like by bar code or QRCode' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Description of the inventory item' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Name of the inventory item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Quantity of the inventory item to save in stock' })
  @IsNumber()
  @IsNotEmpty()
  quantityStock: number;

  @ApiProperty({ description: 'Reorder of the inventory item to save in stock' })
  @IsNumber()
  @IsNotEmpty()
  reorderLevel: number;

  @ApiProperty({ description: 'Reorder of the inventory item to save in stock' })
  @IsNumber()
  @IsNotEmpty()
  reorderQuantity: number;

  @ApiProperty({ description: 'Reorder of the inventory item to save in stock' })
  @IsEnum(InventoryStatus)
  @IsNotEmpty()
  status: InventoryStatus;
}
