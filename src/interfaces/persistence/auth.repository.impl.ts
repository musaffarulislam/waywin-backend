import AuthModel from "../../interfaces/models/AuthModel";
import { Auth } from "../../app/entity/auth.entity";
import OtpModel from "../models/OtpModel";

export class AuthRepositoryImpl {

  public async createUser(username: string, email: string, phoneNumber: string, role: string, password: string): Promise<void> {
    try { 
      const auth = new AuthModel({ username, email, phoneNumber, role, password });
      await auth.save();
    } catch (error) { 
      throw new Error("Failed to create user.");
    }
  }

  public async findOtp(email: string) {
    try {  
      return await OtpModel.findOne({email: email});
    } catch (error) {  
      throw new Error("Failed to create user.");
    }
  }

  public async deleteOtp(email: string) {
    try {  
      return await OtpModel.deleteMany({email: email});
    } catch (error) {  
      throw new Error("Failed to create user.");
    }
  }

  public async newOtp(email: string, otp: string, expirationTime: Date): Promise<void> {
    try {  
      const newOtp = new OtpModel({ 
        email, 
        otp,
        expiresAt: expirationTime  
      });
      await newOtp.save();
    } catch (error) {  
      throw new Error("Failed to create user.");
    }
  }

  public async findByAuthId(authId: string): Promise<Auth | null> {
    try{
      return await AuthModel.findById(authId);
    }catch (error){
      throw new Error("Auth not available")
    }
  }

  public async findByEmail(email: string): Promise<Auth | null> {  
    return AuthModel.findOne({ email }).exec();
  }

  public async findByUsername(username: string): Promise<Auth | null> {
      return AuthModel.findOne({username: username})
  }

  public async findByPhoneNumber(phoneNumber: number): Promise<Auth | null> {
      return AuthModel.findOne({phoneNumber: phoneNumber})
  }

}
