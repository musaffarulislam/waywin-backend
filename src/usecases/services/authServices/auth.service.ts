import bcrypt from "bcrypt";
import { TokenUtils } from "../../utils/tokenUtils";
import { Auth } from "../../../app/entity/auth.entity";
import nodemailer from "nodemailer";

export class AuthService {
  private readonly tokenUtils: TokenUtils;
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly authRepository: any) {
    this.tokenUtils = new TokenUtils();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.API_KEY_NODEMAILER
      }
    });
  }

  public async signup({username, email, phoneNumber, role, password}: Auth): Promise<void> {
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.authRepository.createUser(username, email, phoneNumber, role, hashedPassword);
    }catch(error){
      throw error
    }
  }

  public async otpGenerate(email: string): Promise<void> {
    try{
      const otp: string = Math.floor(1000 + Math.random() * 9000).toString(); 
      const options: any = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toLocaleString(undefined, options);

      await this.authRepository.deleteOtp(email);

      await this.authRepository.newOtp(email, otp, expirationTime);

      const mailOptions = {
        from: process.env.USER_NODEMAILER,
        to: email,
        subject: 'OTP',
        text: `Your otp :${otp}`,
        html: `
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bookworm</a>
        </div>
        <p style="font-size:1.1em">Hi email,</p>
        <p>Thank you for choosing Waywin. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Bookworm</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Waywin</p>
        </div>`
      };
      
      await this.transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log("Failed to generate otp");
        } else {
          console.log("Email sent successfully");
        }
      });
    }catch(error){
      throw error; 
    }
  }
  
  public async verifyOtp(email: string, otp: string): Promise<void> {
    try { 
      const userOtp = await this.authRepository.findOtp(email);
      const expiresAtUTC = new Date(userOtp.expiresAt); // Convert to UTC date object
  
      if (otp === userOtp.otp) {
        const date = new Date(Date.now()); 
        if (date < expiresAtUTC) {
          await this.authRepository.deleteOtp(email);
        } else {
          throw new Error("Otp expired. Please resend otp");
        }
      } else {
        throw new Error("Otp is incorrect. Please verify otp");
      }
    } catch (error) {
      throw error;
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
