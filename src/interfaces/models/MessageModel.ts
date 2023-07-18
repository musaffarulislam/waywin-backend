import { Document, Schema, Model, model } from "mongoose";

export interface IMessage extends Document {
    sender: Schema.Types.ObjectId; 
    content: string;
    chat: Schema.Types.ObjectId; 
    readBy: [Schema.Types.ObjectId];
}

const messageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: "Auth"}, 
    content: { type: String, require: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat"}, 
    readBy: [{ type: Schema.Types.ObjectId, ref: "Auth" }],
}, { timestamps: true });

const MessageModel: Model<IMessage> = model<IMessage>("Message",messageSchema);

export default MessageModel;