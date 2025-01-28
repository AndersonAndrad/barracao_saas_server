import { sign, verify } from 'jsonwebtoken';

import { GenerateToken } from '@app/core/interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@app/core/interfaces/user.interface';
import { generateHash } from '@app/shared/utils/base64.utils';

@Injectable()
export class AuthService {
  private readonly tokensMap: Map<string, string> = new Map<string, string>();
  private readonly userMap: Map<string, Omit<User, 'password'>> = new Map<string, Omit<User, 'password'>>();
  private readonly logedUserMap: Map<string, string> = new Map<string, string>();

  private readonly HASH_TOKEN: string = `_${new Date().getHours()}`;
  private readonly HASH_REFRESH_TOKEN: string = `${generateHash()}_${new Date().getMilliseconds()}`;

  generateToken(user: Omit<User, 'password'>): GenerateToken {
    const token: string = sign(user, this.HASH_TOKEN);
    const refreshToken: string = sign({}, this.HASH_REFRESH_TOKEN);

    this.tokensMap.set(token, refreshToken);
    this.userMap.set(token, user);

    return { token, refreshToken };
  }

  validateToken(props: GenerateToken): boolean {
    try {
      verify(props.token, this.HASH_TOKEN);
      return true;
    } catch (error) {
      if (this.tokensMap.has(props.token) && this.userMap.has(props.token)) {
        const user = this.userMap.get(props.token);

        const newToken = this.generateToken(user);

        this.tokensMap.delete(props.token);
        this.tokensMap.set(newToken.token, newToken.refreshToken);
        this.userMap.set(newToken.token, user);

        return true;
      }
      return false;
    }
  }

  invalidateToken(email: string): void {
    if (!this.logedUserMap.has(email)) return;

    const token: string = this.logedUserMap.get(email);

    this.userMap.delete(token);
    this.tokensMap.delete(token);
  }
}
