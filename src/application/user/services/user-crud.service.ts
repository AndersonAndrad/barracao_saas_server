import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../core/db-repositories/user.repository';
import { CreateUserDto } from '../../../core/dto/user/create-user.dto';
import { PaginationResponse } from '../../../core/interfaces/pagination.interface';
import { FilterUser, User } from '../../../core/interfaces/user.interface';
import { UserRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-user.repository';
import { CrudTemplate } from '../../../shared/templates/crud.template';

@Injectable()
export class UserCrudService implements CrudTemplate<User> {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) { }

  create(user: CreateUserDto): Promise<User> {
    if (!(user.password === user.confirmPassword)) {
      throw new ConflictException('Passwords do not match');
    }

    return this.userRepository.create({ ...user, email: user.email.toLowerCase() });
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

  find(filter: FilterUser): Promise<PaginationResponse<User>> {
    return this.userRepository.find(filter);
  }
}
