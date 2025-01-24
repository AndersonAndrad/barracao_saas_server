import { GenerateToken } from '@app/core/interfaces/auth.interface';
import { UserErrors, UserLogin } from '@app/core/interfaces/user.interface';
import { AuthService } from '@app/infra/auth/auth.server';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/core/db-repositories/user.repository';
import { UserRepositorySymbol } from 'src/infra/db/mongoose/repositories/mongoose-user.repository';
import { UserPasswordService } from './user-password.service';

@Injectable()
export class UserLoginService {
  constructor(
    @Inject(UserRepositorySymbol) private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly passwordService: UserPasswordService,
  ) { }

  async login(props: UserLogin): Promise<GenerateToken> {
    const user = await this.userRepository.getByEmail(props.email);

    if (!user) new NotFoundException(UserErrors.NOT_FOUND);

    this.passwordService.checkMatchPassword(user.password, props.password);

    return this.authService.generateToken(user);
  }

  logout() { }
}

/**
 * Quando o usuário fizer login, será devolvido um token de autenticação e outro de refresh
 * O token de validação é usado uma chave primária e secundária, sendo a secundária a hora atual
 * Para toda requisição será verificado o token, caso o token seja inválido deve ser verificado o refresh token
 * caso o Refresh token seja válido deve ser gerado um novo token e um novo refresh token para o usuário e apagado o antigo
 * quando o usuário fizer logout deve ser apagado o token e refresh token
 * Para fazer login deve ser validado o token e o refresh token caso Invalido o token refazer o passo 4 (linha)
 */
