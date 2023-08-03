import bcrypt from "bcrypt";
import { TokenUtils } from "../../utils/tokenUtils";
import { Auth } from "../../../app/entity/auth.entity";

export class AuthService {
  private readonly tokenUtils: TokenUtils;

  constructor(private readonly authRepository: any) {
    this.tokenUtils = new TokenUtils();
  }

  public async signup({username, email, phoneNumber, role, password}: Auth): Promise<void> {
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.authRepository.createUser(username, email, phoneNumber, role, hashedPassword);
    }catch(error){
      throw error
    }
  }

  public async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; role?: string }> {
    try{
      const auth = await this.authRepository.findByEmail(email);
      if (!auth) {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          const accessToken = this.tokenUtils.generateAccessTokenAdmin(email);
          const refreshToken = this.tokenUtils.generateRefreshTokenAdmin(email);
          return { accessToken, refreshToken, role: "Admin"};
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        if(auth.isActive){
          const checkPassword = await bcrypt.compare(password, auth.password);
          if (!checkPassword) {
            throw new Error("Invalid credentials");
          }
          const accessToken = this.tokenUtils.generateAccessToken(auth._id);
          const refreshToken = this.tokenUtils.generateRefreshToken(auth._id);
          return { accessToken, refreshToken, role: auth.role };
        }else {
          throw new Error("This email suspended");
        }
      }
    }catch(error){
      throw error
    }
  }
  
  public verifyAccessToken(accessToken: string): Auth | null {
    try {
      const decodedToken = this.tokenUtils.verifyToken(accessToken, this.tokenUtils.accessTokenSecret);
      // Assuming AuthModel as the type of the decoded token
      return decodedToken as Auth;
    } catch (error) {
      return null;
    }
  }

  public verifyRefreshToken(refreshToken: string): Auth | null {
    try {
      const decodedToken = this.tokenUtils.verifyToken(refreshToken, this.tokenUtils.refreshTokenSecret);
      // Assuming AuthModel as the type of the decoded token
      return decodedToken as Auth;
    } catch (error) {
      return null;
    }
  }

  public generateAccessToken(authId: any): { accessToken: string} {
    try{
      const accessToken = this.tokenUtils.generateAccessToken(authId);
      return { accessToken }
    }catch(error){
      throw error
    }
  }
  
  public async getAuthInformation(authId: string){
    try{
      const authDetails = await this.authRepository.findByAuthId(authId);
      const selectedAuthInfo = {
        _id: authDetails?._id,
        username: authDetails?.username,
        email: authDetails?.email,
        phoneNumber: authDetails?.phoneNumber,
      };
      return {authInfo: selectedAuthInfo};
    }catch(error){
      throw error
    }
  }

  public async checkUsernameExist(username: string):  Promise<void> {
    try{
      const auth = await this.authRepository.findByUsername(username);
      if(auth){
        throw new Error("Username already registered");
      }
    }catch(error){
      throw error
    }
  }

  public async checkEmailExist(email: string):  Promise<void> {
    try{
        const auth = await this.authRepository.findByEmail(email);
        if(auth){
          throw new Error("Email already registered");
        }
    }catch(error){
      throw error
    }
  }

  public async checkPhoneNumberExist(phoneNumber: number):  Promise<void> {
    try{
      const auth = await this.authRepository.findByPhoneNumber(phoneNumber);
      if(auth){
        throw new Error("Phone number already registered");
      }
    }catch(error){
      throw error
    }
  }
}
