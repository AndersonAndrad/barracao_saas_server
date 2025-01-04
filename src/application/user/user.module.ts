import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCrudService } from './services/user-crud.service';
import {
  MongooseUserRepository,
  UserRepositorySymbol,
} from '../../infra/db/mongoose/repositories/mongoose-user.repository';
import { UserPasswordService } from './services/user-password.service';

@Module({
  imports: [],
  exports: [UserCrudService],
  controllers: [UserController],
  providers: [
    UserCrudService,
    UserPasswordService,
    { provide: UserRepositorySymbol, useClass: MongooseUserRepository },
  ],
})
export class UserModule {}
