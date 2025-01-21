import { AuthService } from '@app/infra/auth/auth.server';

describe('Auth service', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  test('should be auth service instance', () => {
    expect(authService).toBeDefined();
  });

  test('should be generage token', () => {
    const returnToken = authService.generateToken({} as any);

    expect(returnToken.token).toBeTruthy();
    expect(returnToken.refreshToken).toBeTruthy();
  });

  test('should be check token is valid', () => {
    const tokenProps = authService.generateToken({} as any);

    const tokenIsValid: boolean = authService.validateToken(tokenProps);

    expect(tokenIsValid).toBeTruthy();
  });

  test('should be check token is invalid', () => {
    const tokenProps = authService.generateToken({} as any);

    const tokenIsValid: boolean = authService.validateToken({ ...tokenProps, token: 'invalid' });

    expect(tokenIsValid).toBeFalsy();
  });
});
