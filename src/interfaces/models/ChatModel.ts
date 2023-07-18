import { Document, Schema, Model, model } from "mongoose";

export interface IChat extends Document {
    chatName: string;
    users: [Schema.Types.ObjectId];
    latestMessage: Schema.Types.ObjectId; 
}

const chatSchema = new Schema<IChat>({
    chatName: { type: String, require: true },
    users: [{ type: Schema.Types.ObjectId, ref: "Auth" }],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message"}, 
}, { timestamps: true });

const ChatModel: Model<IChat> = model<IChat>("Chat",chatSchema);

export default ChatModel;