import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({
    authId: {type: mongoose.SchemaTypes.ObjectId, ref: "Auth"},
    wallet: {type: Number},
    // isStatus: {type: Boolean, default: true},
},{timestamps: true});

export default mongoose.model("User", userSchema)