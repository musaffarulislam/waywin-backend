import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({
    authId: {type: mongoose.SchemaTypes.ObjectId, ref: "Auth"},
    wallet: {type: Number}
},{timestamps: true});

export default mongoose.model("User", userSchema)