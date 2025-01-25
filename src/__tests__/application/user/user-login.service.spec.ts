import { User, UserStatus } from '@app/core/interfaces/user.interface';
import { Test, TestingModule } from '@nestjs/testing';

import { UserLoginService } from '@app/application/user/services/user-login.service';
import { UserPasswordService } from '@app/application/user/services/user-password.service';
import { UserRepository } from '@app/core/db-repositories/user.repository';
import { AuthService } from '@app/infra/auth/auth.server';
import { UserRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-user.repository';
import { generateHash } from '@app/shared/utils/base64.utils';
import { faker } from '@faker-js/faker';

describe('UserLoginService', () => {
  let userLoginService: UserLoginService;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordService: jest.Mocked<UserPasswordService>;
  let authService: AuthService;

  const mockUser: User = {
    _id: generateHash(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    alias: faker.internet.userName(),
    birthday: faker.date.past(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    color: faker.color.rgb(),
    status: UserStatus.NEW,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserLoginService,
        {
          provide: UserRepositorySymbol,
          useValue: {
            getByEmail: jest.fn(),
          },
        },
        {
          provide: UserPasswordService,
          useValue: {
            checkMatchPassword: jest.fn(),
          },
        },
        AuthService, // Use real AuthService
      ],
    }).compile();

    userLoginService = module.get<UserLoginService>(UserLoginService);
    userRepository = module.get(UserRepositorySymbol);
    passwordService = module.get(UserPasswordService);
    authService = module.get(AuthService);
  });

  it('should successfully log in a user and generate a real token', async () => {
    userRepository.getByEmail.mockResolvedValue(mockUser);
    passwordService.checkMatchPassword.mockImplementation(() => true); // Simulate password check success

    const result = await userLoginService.login({ email: mockUser.email, password: 'password123' });

    expect(userRepository.getByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(passwordService.checkMatchPassword).toHaveBeenCalledWith(mockUser.password, 'password123');

    // Validate token structure
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refreshToken');
    expect(typeof result.token).toBe('string');
  });
});
