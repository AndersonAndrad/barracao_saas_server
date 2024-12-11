import { User } from '../interfaces/user.interface';
import { CrudTemplate } from '../../shared/templates/crud.template';

export interface UserRepository extends CrudTemplate<User> {}
