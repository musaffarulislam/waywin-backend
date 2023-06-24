import { Document, Schema, Model, model } from "mongoose";
import { ITagArray } from "../../app/entity/trainer.entity";

export interface ITags extends Document {
  tags: ITagArray;
}

const tagSchema = new Schema<ITags>({
    tags: [String]
}, { timestamps: true });

const TagModel: Model<ITags> = model<ITags>("Tag",tagSchema);

export default TagModel;