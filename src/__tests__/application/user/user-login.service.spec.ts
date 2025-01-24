import { UserLoginService } from '@app/application/user/services/user-login.service';
import { UserPasswordService } from '@app/application/user/services/user-password.service';
import { UserRepository } from '@app/core/db-repositories/user.repository';
import { AuthService } from '@app/infra/auth/auth.server';

describe('User Services Test', () => {
  // Services
  let authServiceMock: jest.Mocked<Partial<AuthService>>;
  let loginServiceMock: jest.Mocked<Partial<UserLoginService>>;
  let passwordServiceMock: jest.Mocked<Partial<UserPasswordService>>;

  // Repository
  let userRepositoryMock: jest.Mocked<Partial<UserRepository>>;

  beforeEach(() => {
    // Mock repository with required methods
    userRepositoryMock = {
      create: jest.fn(),
      updatePassword: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    // Mock services instead of instantiating them
    authServiceMock = {
      login: jest.fn(),
      logout: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    passwordServiceMock = {
      resetPassword: jest.fn(),
      changePassword: jest.fn(),
    } as unknown as jest.Mocked<UserPasswordService>;

    loginServiceMock = {
      login: jest.fn(),
      logout: jest.fn(),
    } as unknown as jest.Mocked<UserLoginService>;
  });

  it('should initialize all mocked services', () => {
    expect(loginServiceMock).toBeDefined();
    expect(authServiceMock).toBeDefined();
    expect(passwordServiceMock).toBeDefined();
  });
});
