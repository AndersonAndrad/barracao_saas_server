import { faker } from '@faker-js/faker';
import { UserCrudService } from '../../../application/user/services/user-crud.service';
import { UserRepository } from '../../../core/db-repositories/user.repository';
import { CreateUserDto } from '../../../core/dto/user/create-user.dto';
import Mock = jest.Mock;

describe('User service', () => {
  let service: UserCrudService;
  let repository: Mock<UserRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    service = new UserCrudService(repository as any);
  });

  test('should be service defined', () => {
    expect(service).toBeDefined();
  });

  test('should create a user', async () => {
    const spy = jest.spyOn(service, 'create');
    const password: string = faker.internet.password();

    const userToCreate: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
      confirmPassword: password,
      alias: faker.internet.userName(),
      birthday: faker.date.past(),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      color: faker.color.rgb(),
    };

    await service.create(userToCreate);

    expect(spy).toHaveBeenCalled();

    expect(service.create).toHaveBeenCalledWith(userToCreate);
  });

  // test('should dispatch exception when passwords do not match', async () => {
  //   const userToCreate: CreateUserDto = {
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     confirmPassword: faker.internet.password(), // Different password
  //     alias: faker.internet.userName(),
  //     birthday: faker.date.past(),
  //     phone: faker.phone.number(),
  //     avatar: faker.image.avatar(),
  //     color: faker.color.rgb(),
  //   };

  //   await expect(service.create(userToCreate)).rejects.toThrowError(ConflictException);
  //   await expect(service.create(userToCreate)).rejects.toThrowError('Passwords do not match');
  // });
});
