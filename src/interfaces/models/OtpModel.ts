import mongoose, { Document } from "mongoose"; 

export interface IOtp extends Document {
    email: string; 
    otp : string;
    expiresAt : string; 
}
const otpSchema = new mongoose.Schema<IOtp>({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, unique: true },
    expiresAt: { type: String, required: true, unique: true },
},{timestamps: true});


export default mongoose.model<IOtp>("Otp", otpSchema);


