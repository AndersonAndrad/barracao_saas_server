import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CrudTemplate } from '../../../shared/templates/crud.template';
import { User } from '../../../core/interfaces/user.interface';
import { UserRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-user.repository';
import { UserRepository } from '../../../core/db-repositories/user.repository';
import { CreateUserDto } from '../../../core/dto/user/create-user.dto';
import { PaginationResponse } from '../../../core/interfaces/pagination.interface';

@Injectable()
export class UserCrudService implements CrudTemplate<User> {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) {}

  create(user: CreateUserDto): Promise<User> {
    if (!(user.password === user.confirmPassword)) {
      throw new ConflictException('Passwords do not match');
    }

    return this.userRepository.create(user);
  }

  async deleteOne(userId: string): Promise<void> {
    await this.userRepository.deleteOne(userId);
  }

  findOne(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  updateOne(userId: string, user: Partial<User>): Promise<User> {
    return this.userRepository.updateOne(userId, user);
  }

  find(filter: any): Promise<PaginationResponse<User>> {
    return this.userRepository.find(filter);
  }
}
