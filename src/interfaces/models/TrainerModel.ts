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
  // isBanner: boolean;
  availableDates: Array<{ date: Date; time: string[] }>;
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
  availableDates: [
    {
      date: { type: Date, required: true },
      time: [String],
    },
  ],
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });


// trainerSchema.pre<ITrainer>('save', function (next) {
//   const currentDate = new Date();
//   currentDate.setUTCHours(0, 0, 0, 0);
//   this.availableDates = this.availableDates.filter((dateObj) => {
//     const date = new Date(dateObj.date);
//     date.setUTCHours(0, 0, 0, 0);
//     return date >= currentDate;
//   });

//   next();
// });


const TrainerModel: Model<ITrainer> = model<ITrainer>("Trainer", trainerSchema);

export default TrainerModel;
