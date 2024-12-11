import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { SyncInventoryStockHistoryService } from './services/sync-inventory-stock-history.service';
import { Promise } from 'mongoose';
import { PaginationResponse } from '../../core/interfaces/pagination.interface';
import { StockHistory } from '../../core/interfaces/inventory-stock-history.interface';
import { FilterPaginationInterceptor } from '../../core/interceptors/filter-pagination.interceptor';
import { FilterInventoryStockHistoryDto } from '../../core/dto/inventory-stock-history/filter-inventory-stock-history.dto';

@ApiTags('Inventory Stock History')
@Controller('inventory-stock-history')
export class InventoryStockHistoryController implements Omit<SyncInventoryStockHistoryService, 'create'> {
  constructor(private readonly syncInventoryStockHistoryService: SyncInventoryStockHistoryService) {}

  @Get()
  @UseInterceptors(FilterPaginationInterceptor)
  @ApiOperation({ summary: 'Get all history by item inventory history' })
  async find(@Query() filter: FilterInventoryStockHistoryDto): Promise<PaginationResponse<StockHistory>> {
    return this.syncInventoryStockHistoryService.find(filter);
  }
}
