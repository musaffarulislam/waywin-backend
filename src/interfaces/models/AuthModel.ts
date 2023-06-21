import mongoose, { Document } from 'mongoose';
import { Auth } from '../../app/entity/auth.entity';
import { IUser } from '../../app/entity/user.entity';
import UserModel from '../../interfaces/models/UserModel';
import TrainerModel from '../../interfaces/models/TrainerModel';

export interface AuthModel extends Document, Auth{
  Auth: any;
}

const authSchema = new mongoose.Schema<Auth>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
},{timestamps: true});

authSchema.post<AuthModel>('save', async function (doc) {
  if (doc.role === 'User') {
    await UserModel.create({ authId: doc._id});
  } else if (doc.role === 'Trainer') {
    await TrainerModel.create({ authId: doc._id });
  }
});


export default mongoose.model<Auth>('Auth', authSchema);


