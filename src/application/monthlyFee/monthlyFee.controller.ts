import { CreateMonthlyFeeDto } from '@app/core/dto/monthlyFee/create-monthlyFee.dto';
import { UpdateMonthlyFeeDto } from '@app/core/dto/monthlyFee/update-monthlyFee.dto';
import { MonthlyFee } from '@app/core/interfaces/monthlyFee.interface';
import { PaginationResponse } from '@app/core/interfaces/pagination.interface';
import { CrudTemplate } from '@app/shared/templates/crud.template';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MonthlyFeeCrudService } from './services/monthlyFee-crud.service';

@ApiTags('MonthlyFee')
@Controller('monthly-fee')
export class MonthlyFeeController implements CrudTemplate<MonthlyFee> {
  constructor(private readonly monthlyFeeCrudService: MonthlyFeeCrudService) { }

  @Post()
  @ApiOperation({ summary: 'Create monthly fee' })
  create(@Body() entity: CreateMonthlyFeeDto): Promise<MonthlyFee> {
    return this.monthlyFeeCrudService.create(entity);
  }

  @Get(':entityId')
  @ApiOperation({ summary: 'Find one monthly fee by id' })
  findOne(@Param('entityId') entityId: string): Promise<MonthlyFee> {
    return this.monthlyFeeCrudService.findOne(entityId);
  }

  @Get()
  @ApiOperation({ summary: 'Find many monthly fee by filter' })
  find(@Query() filter: any): Promise<PaginationResponse<MonthlyFee>> {
    return this.monthlyFeeCrudService.find(filter);
  }

  @Patch(':entityId')
  @ApiOperation({ summary: 'Update monthly fee by id' })
  updateOne(@Param('entityId') entityId: string, @Body() entity: UpdateMonthlyFeeDto): Promise<MonthlyFee> {
    return this.monthlyFeeCrudService.updateOne(entityId, entity);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete monthly fee by id' })
  deleteOne(@Param('entityId') entityId: string): Promise<void> {
    return this.monthlyFeeCrudService.deleteOne(entityId);
  }
}
