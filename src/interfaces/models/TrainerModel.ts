import { Document, Schema, Model, model } from "mongoose";
import { ITrainerProfile } from "../../app/entity/trainer.entity";

export interface ITrainer extends Document {
  authId: Schema.Types.ObjectId;
  profile: ITrainerProfile;
  wallate: number;
  profileImage:{
    public_id: string;
    url: string;
  };
  isProfile: boolean;
  bannerImage:{
    public_id: string;
    url: string;
  };
  isBanner: boolean;
  isVerified: boolean;
}

const trainerSchema = new Schema<ITrainer>({
  authId: { type: Schema.Types.ObjectId, ref: "Auth" },
  profile: {
    services: [String],
    description: String,
    tags: [String],
    experience: Number,
    mode: [String],
  },
  wallate: Number,
  profileImage: {
    public_id: {type: String, required: true},
    url: {type: String, required: true},
  },
  isProfile: { type: Boolean, default: false},
  bannerImage: {
    public_id: {type: String, required: true},
    url: {type: String, required: true},
  },
  isBanner: { type: Boolean, default: false},
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const TrainerModel: Model<ITrainer> = model<ITrainer>("Trainer", trainerSchema);

export default TrainerModel;
