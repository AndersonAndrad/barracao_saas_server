import mongoose from 'mongoose';
import { User, UserStatus } from '../../../../core/interfaces/user.interface';

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: UserStatus },
  phone: { type: String },
  birthday: { type: Date },
  alias: { type: String },
  avatar: { type: String },
  color: { type: String },
});

export const UserModel: mongoose.Model<User> = mongoose.model('user', userSchema);
