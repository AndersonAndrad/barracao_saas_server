import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CrudTemplate } from '../../shared/templates/crud.template';
import { User } from '../../core/interfaces/user.interface';
import { CreateUserDto } from '../../core/dto/user/create-user.dto';
import { UserCrudService } from './services/user-crud.service';
import { UpdateUserDto } from '../../core/dto/user/update-user.dto';
import { PaginationResponse } from '../../core/interfaces/pagination.interface';
import { FilterUserDto } from '../../core/dto/user/find-user.dto';
import { UserPasswordService } from './services/user-password.service';
import { UpdatePasswordDto } from '../../core/dto/user/update-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController implements CrudTemplate<User> {
  constructor(
    private readonly userCrudService: UserCrudService,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  @Post()
  create(@Body() entity: CreateUserDto): Promise<User> {
    return this.userCrudService.create(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users paginated' })
  find(@Query() filter: FilterUserDto): Promise<PaginationResponse<User>> {
    return this.userCrudService.find(filter);
  }

  @Get(':entityId')
  @ApiParam({ name: 'entityId' })
  @ApiOperation({ description: 'Return only one user by user id' })
  findOne(@Param('entityId') entityId: User['_id']): Promise<User> {
    return this.userCrudService.findOne(entityId);
  }

  @Delete(':entityId')
  @ApiParam({ name: 'entityId' })
  @ApiOperation({ description: 'Delete user by id' })
  deleteOne(@Param('entityId') entityId: User['_id']): Promise<void> {
    return this.userCrudService.deleteOne(entityId);
  }

  @Patch(':entityId')
  @ApiParam({ name: 'entityId' })
  @ApiOperation({ description: 'Update user by id' })
  updateOne(@Param('entityId') entityId: User['_id'], @Body() entity: UpdateUserDto): Promise<User> {
    return this.userCrudService.updateOne(entityId, entity);
  }

  @Patch('reset-password/:entityId')
  @ApiParam({ name: 'entityId' })
  @ApiOperation({ description: 'change user password' })
  resetPassword(@Param('entityId') entityId: User['_id'], @Body() props: UpdatePasswordDto): Promise<void> {
    return this.userPasswordService.updatePassword(entityId, props);
  }
}
