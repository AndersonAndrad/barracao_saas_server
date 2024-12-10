import mongoose from 'mongoose';
import { User } from '../../../../core/interfaces/user.interface';

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel: mongoose.Model<User> = mongoose.model('user', userSchema);
