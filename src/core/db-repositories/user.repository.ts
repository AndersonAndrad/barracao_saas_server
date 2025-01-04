import { UpdatePassword, User } from '../interfaces/user.interface';
import { CrudTemplate } from '../../shared/templates/crud.template';

export interface UserRepository extends CrudTemplate<User> {
  updatePassword(userId: User['_id'], props: Pick<UpdatePassword, 'password'>): Promise<void>;

  getUserPassword(userId: User['_id']): Promise<{ password: string }>;
}
