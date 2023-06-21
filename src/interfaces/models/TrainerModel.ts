import { Document, Schema, Model, model } from "mongoose";
import { ITrainerProfile } from "../../app/entity/trainer.entity";

export interface ITrainer extends Document {
  authId: Schema.Types.ObjectId;
  profile: ITrainerProfile;
  wallate: number;
  isVarified: boolean;
  status: boolean;
}

const trainerSchema = new Schema<ITrainer>({
  authId: { type: Schema.Types.ObjectId, ref: "Auth" },
  profile: {
    services: [String],
    description: String,
    tags: [String],
    experience: Number,
    mode: [String],
    colorPalette: String,
  },
  wallate: Number,
  isVarified: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
}, { timestamps: true });

const TrainerModel: Model<ITrainer> = model<ITrainer>("Trainer", trainerSchema);

export default TrainerModel;
