import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BillRepository } from '../../core/db-repositories/bill.repository';
import { Bill } from '../../core/interfaces/bill.interface';
import { PaginationResponse } from '../../core/interfaces/pagination.interface';
import { BillService } from './services/crud-bill.service';
import { FilterPaginationInterceptor } from '../../core/interceptors/filter-pagination.interceptor';
import { FilterBillDto } from '../../core/dto/bill/filter-bill.dto';
import { CreateBillDto } from '../../core/dto/bill/create-bill.dto';
import { UpdateBillDto } from '../../core/dto/bill/update-bill.dto';

@ApiTags('Bill')
@Controller('bill')
export class BillController implements BillRepository {
  constructor(private readonly billService: BillService) {}

  @Post()
  @ApiOperation({ summary: 'Create bill' })
  create(@Body() entity: CreateBillDto): Promise<Bill> {
    return this.billService.create(entity);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete a bill by id' })
  deleteOne(@Param('entityId') entityId: string): Promise<void> {
    return this.billService.deleteOne(entityId);
  }

  @Get()
  @UseInterceptors(FilterPaginationInterceptor)
  @ApiOperation({ summary: 'Get all bills by filter' })
  find(@Query() filter: FilterBillDto): Promise<PaginationResponse<Bill>> {
    return this.billService.find(filter);
  }

  @Get(':entityId')
  @ApiOperation({ summary: 'Get bill by id' })
  findOne(@Param('entityId') entityId: string): Promise<Bill> {
    return this.billService.findOne(entityId);
  }

  @Put(':entityId')
  @ApiOperation({ summary: 'Update bill' })
  updateOne(@Param('entityId') entityId: string, @Body() entity: UpdateBillDto): Promise<Bill> {
    return this.billService.updateOne(entityId, entity);
  }
}
