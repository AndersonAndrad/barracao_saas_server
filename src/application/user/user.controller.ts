import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CrudTemplate } from '../../shared/templates/crud.template';
import { User } from '../../core/interfaces/user.interface';
import { CreateUserDto } from '../../core/dto/user/create-user.dto';
import { UserCrudService } from './services/user-crud.service';
import { UpdateUserDto } from '../../core/dto/user/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController implements CrudTemplate<User> {
  constructor(private readonly userCrudService: UserCrudService) {}

  @Post()
  create(@Body() entity: CreateUserDto): Promise<User> {
    return this.userCrudService.create(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  allUsers(): Promise<User[]> {
    return this.userCrudService.allUsers();
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

  @Put(':entityId')
  @ApiParam({ name: 'entityId' })
  @ApiOperation({ description: 'Update user by id' })
  updateOne(
    @Param('entityId') entityId: User['_id'],
    @Body() entity: UpdateUserDto,
  ): Promise<User> {
    return this.userCrudService.updateOne(entityId, entity);
  }
}
