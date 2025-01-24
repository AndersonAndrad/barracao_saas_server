import {
  MongooseUserRepository,
  UserRepositorySymbol,
} from '../../infra/db/mongoose/repositories/mongoose-user.repository';

import { AuthService } from '@app/infra/auth/auth.server';
import { Module } from '@nestjs/common';
import { UserCrudService } from './services/user-crud.service';
import { UserLoginService } from './services/user-login.service';
import { UserPasswordService } from './services/user-password.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  exports: [UserCrudService],
  controllers: [UserController],
  providers: [
    UserCrudService,
    UserPasswordService,
    UserLoginService,
    AuthService,
    { provide: UserRepositorySymbol, useClass: MongooseUserRepository },
  ],
})
export class UserModule { }
