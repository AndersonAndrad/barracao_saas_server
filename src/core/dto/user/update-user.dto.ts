import { User } from '../../interfaces/user.interface';

export class UpdateUserDto implements Partial<Omit<User, '_id'>> {}
