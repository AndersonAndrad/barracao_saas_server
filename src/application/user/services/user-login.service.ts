import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/db-repositories/user.repository';
import { UserRepositorySymbol } from 'src/infra/db/mongoose/repositories/mongoose-user.repository';

@Injectable()
export class UserLoginService {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) { }

  login() { }

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
