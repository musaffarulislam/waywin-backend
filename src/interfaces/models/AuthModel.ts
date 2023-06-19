import mongoose, { Document } from 'mongoose';
import { Auth } from '../../app/entity/auth.entity';

export interface AuthModel extends Document {
  Auth: any;
}

const authSchema = new mongoose.Schema<Auth>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<Auth>('Auth', authSchema);
