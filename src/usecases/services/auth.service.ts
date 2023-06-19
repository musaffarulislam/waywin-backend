import bcrypt from 'bcrypt';
import { TokenUtils } from '../utils/tokenUtils';
import { Auth } from '../../app/entity/auth.entity';

export class AuthService {
  private readonly tokenUtils: TokenUtils;

  constructor(private readonly authRepository: any) {
    this.tokenUtils = new TokenUtils();
  }

  public async signup({username, email, phoneNumber, role, password}: Auth): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.createUser(username, email, phoneNumber, role, hashedPassword);
  }

  public async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; role: string }> {
    const auth = await this.authRepository.findByEmail(email);
    if (!auth) {
      throw new Error('Invalid credentials');
    }
    const checkPassword = await bcrypt.compare(password,auth.password)
    if(!checkPassword){
      throw new Error('Invalid credentials');
    }
    const accessToken = this.tokenUtils.generateAccessToken(auth);
    const refreshToken = this.tokenUtils.generateRefreshToken(auth);
    return { accessToken, refreshToken, role: auth.role };
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

  public async checkUsernameExist(username: string):  Promise<void> {
    const auth = await this.authRepository.findByUsername(username);
    if(auth){
      throw new Error('Username already registered');
    }
  }

  public async checkEmailExist(email: string):  Promise<void> {
    const auth = await this.authRepository.findByEmail(email);
    if(auth){
      throw new Error('Email already registered');
    }
  }

  public async checkPhoneNumberExist(phoneNumber: number):  Promise<void> {
    const auth = await this.authRepository.findByPhoneNumber(phoneNumber);
    if(auth){
      throw new Error('Phone number already registered');
    }
  }
}
