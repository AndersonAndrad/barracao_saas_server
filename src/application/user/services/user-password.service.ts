import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../core/db-repositories/user.repository';
import { UpdatePassword, User, UserErrors } from '../../../core/interfaces/user.interface';
import { UserRepositorySymbol } from '../../../infra/db/mongoose/repositories/mongoose-user.repository';

@Injectable()
export class UserPasswordService {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) { }

  /**
   * @todo - implement method to check match password
   * @param currentPassword
   * @param passedPassword
   * @private
   */
  checkMatchPassword(currentPassword: string, passedPassword: string): void {
    if (currentPassword !== passedPassword) throw new UnauthorizedException(UserErrors.UNAUTHORIZED_PASSWORD);
  }

  async updatePassword(userId: User['_id'], props: UpdatePassword): Promise<void> {
    const currentPassword = await this.getUserPassword(userId);

    // Check current passwords
    this.checkMatchPassword(currentPassword.password, props.password);

    // Check new passwords
    this.checkMatchPassword(props.newPassword, props.confirmationPassword);

    // encrypt password
    const password = await this.encryptPassword(props.newPassword);

    await this.userRepository.updatePassword(userId, { password });
  }

  private async getUserPassword(userId: User['_id']): Promise<{ password: string }> {
    return await this.userRepository.getUserPassword(userId);
  }

  /**
   * @todo - implement method to encrypt password
   * @param password
   * @private
   */
  private async encryptPassword(password: string): Promise<string> {
    return Promise.resolve(password);
  }
}
