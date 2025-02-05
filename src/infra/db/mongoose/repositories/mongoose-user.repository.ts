import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterUser, UpdatePassword, User } from '../../../../core/interfaces/user.interface';
import { dispatchError, formatMongoDocuments } from '../utils/mongoDocuments.utils';

import { UserRepository } from '../../../../core/db-repositories/user.repository';
import { PaginationResponse } from '../../../../core/interfaces/pagination.interface';
import { UserModel } from '../schemas/user.schema';
import { paginationUtils } from '../utils/paginationUtils';

export const UserRepositorySymbol = Symbol('UserRepositoryDb');

@Injectable()
export class MongooseUserRepository implements UserRepository {
  async getByEmail(email: User['email']): Promise<User> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) throw new NotFoundException();

    return formatMongoDocuments<User>(user);
  }

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

  async find(filter: FilterUser): Promise<PaginationResponse<User>> {
    const finalFilter = {};

    if (filter?.word && filter.word.length) {
      finalFilter['$or'] = [
        { name: { $regex: filter.word, $options: 'i' } },
        { alias: { $regex: filter.word, $options: 'i' } },
      ];
    }

    const totalDocs: number = await UserModel.countDocuments(finalFilter);

    const { skip, total } = paginationUtils(filter, totalDocs);

    const items = await UserModel.find(finalFilter)
      .skip(skip)
      .limit(filter?.size ?? 10)
      .exec();

    return {
      items: formatMongoDocuments(items),
      total,
    };
  }

  async updatePassword(userId: User['_id'], props: Pick<UpdatePassword, 'password'>): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { password: props.password });
  }

  async getUserPassword(userId: User['_id']): Promise<{ password: string }> {
    const user = await UserModel.findOne({ _id: userId }, { password: true });

    return formatMongoDocuments(user);
  }

  private readonly userProjection = {
    _id: true,
    name: true,
    email: true,
    avatar: true,
    color: true,
  };
}
