import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../core/db-repositories/user.repository';
import { User } from '../../../../core/interfaces/user.interface';
import { UserModel } from '../schemas/user.schema';
import { dispatchError, formatMongoDocuments } from '../utils/mongoDocuments.utils';
import { PaginationResponse } from '../../../../core/interfaces/pagination.interface';
import { paginationUtils } from '../utils/paginationUtils';

export const UserRepositorySymbol = Symbol('UserRepositoryDb');

@Injectable()
export class MongooseUserRepository implements UserRepository {
  private readonly userProjection = {
    _id: true,
    name: true,
    email: true,
  };

  async create(user: Omit<User, '_id'>): Promise<User> {
    const userCreated = await UserModel.create(user);

    return formatMongoDocuments<User>(userCreated);
  }

  async deleteOne(userId: User['_id']): Promise<void> {
    await UserModel.deleteOne({ _id: userId });
  }

  async findOne(userId: User['_id']): Promise<User> {
    try {
      const user = await UserModel.findOne({ _id: userId }, this.userProjection);

      return formatMongoDocuments<User>(user);
    } catch (error) {
      dispatchError({
        moduleName: 'User',
        errorMessage: error.message,
        complement: userId,
      });
    }
  }

  async updateOne(userId: User['_id'], user: Partial<Omit<User, '_id'>>): Promise<User> {
    await UserModel.updateOne({ _id: userId }, user);

    const userAfterUpdate = await UserModel.findOne({ _id: userId });

    return formatMongoDocuments<User>(userAfterUpdate);
  }

  async find(filter: any): Promise<PaginationResponse<User>> {
    const totalDocs: number = await UserModel.countDocuments();

    const { skip, total } = paginationUtils(filter, totalDocs);

    const items = await UserModel.find()
      .skip(skip)
      .limit(filter?.size ?? 10)
      .exec();

    return {
      items: formatMongoDocuments(items),
      total,
    };
  }
}
