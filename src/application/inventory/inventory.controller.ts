import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CrudTemplate } from '../../shared/templates/crud.template';
import { Inventory } from '../../core/interfaces/inventory.interface';
import { InventoryCrudService } from './services/inventory-crud.service';
import { CreateInventoryDto } from '../../core/dto/inventory/create-inventory.dto';
import { PaginationResponse } from '../../core/interfaces/pagination.interface';
import { FilterPaginationInterceptor } from '../../core/interceptors/filter-pagination.interceptor';
import { FilterInventoryDto } from '../../core/dto/inventory/filter-inventory.dto';
import { UpdateInventoryDto } from '../../core/dto/inventory/update-inventory.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController implements CrudTemplate<Inventory> {
  constructor(private readonly inventoryCrudService: InventoryCrudService) {}

  @Post()
  @ApiOperation({ summary: 'Save item of the inventory' })
  create(@Body() entity: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryCrudService.create(entity);
  }

  @Get()
  @UseInterceptors(FilterPaginationInterceptor)
  @ApiOperation({ summary: 'Get all items of the inventories' })
  find(@Query() filter: FilterInventoryDto): Promise<PaginationResponse<Inventory>> {
    return this.inventoryCrudService.find(filter);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete only one item of the inventory' })
  deleteOne(@Param('entityId') entityId: string): Promise<void> {
    return this.inventoryCrudService.deleteOne(entityId);
  }

  @Get(':entityId')
  @ApiOperation({ summary: 'Get item of the inventory' })
  findOne(@Param('entityId') entityId: string): Promise<Inventory> {
    return this.inventoryCrudService.findOne(entityId);
  }

  @Put(':entityId')
  @ApiOperation({ summary: 'Update item of the inventory' })
  updateOne(@Param('entityId') entityId: string, @Body() entity: UpdateInventoryDto): Promise<Inventory> {
    return this.inventoryCrudService.updateOne(entityId, entity);
  }
}
