import { UserRepository } from '../../../core/db-repositories/user.repository';
import { MongoInMemory } from '../../../infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseUserRepository } from '../../../infra/db/mongoose/repositories/mongoose-user.repository';
import { User } from '../../../core/interfaces/user.interface';
import { faker } from '@faker-js/faker';

describe('User repository', () => {
  let repository: UserRepository;

  let mongoInMemory: MongoInMemory;

  beforeAll(async () => {
    mongoInMemory = await MongoInMemory.startServer();
  });

  beforeEach(async () => {
    await mongoInMemory.clearCollections();

    repository = new MongooseUserRepository();
  });

  afterAll(async () => {
    await mongoInMemory.shutdown();
  });

  test('should be repository instance', () => {
    expect(repository).toBeDefined();
  });

  test('should be create an user', async () => {
    const userToCreate: Omit<User, '_id'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = await repository.create(userToCreate);

    expect(user).toBeDefined();

    delete user._id;

    expect(user).toMatchObject(userToCreate);
  });

  test('should be find one user', async () => {
    const userToCreate: Omit<User, '_id'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await repository.create(userToCreate);

    const user = await repository.findOne(userCreated._id);

    expect(user).toBeDefined();

    expect(userCreated).toMatchObject(user);
  });

  test('should be update an user', async () => {
    const userToCreate: Omit<User, '_id'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await repository.create(userToCreate);

    const userToUpdate = {
      ...userCreated,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    const userUpdated = await repository.updateOne(userCreated._id, userToUpdate);

    expect(userUpdated).toBeDefined();

    expect(userToUpdate).toMatchObject(userUpdated);
  });

  test('should be delete an user', async () => {
    const userToCreate: Omit<User, '_id'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await repository.create(userToCreate);

    await repository.deleteOne(userCreated._id);

    await expect(repository.findOne(userCreated._id)).rejects.toThrowError(`User with id ${userCreated._id} not found`);
  });
});
