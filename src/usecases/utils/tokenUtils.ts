import jwt from 'jsonwebtoken';
import { AuthModel } from '../../interfaces/models/AuthModel';

export class TokenUtils {
  public readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  public readonly refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  public generateAccessToken = (auth: AuthModel) => {
    return jwt.sign({ authId: auth._id }, this.accessTokenSecret, { expiresIn: '15m' });
  };

  public generateRefreshToken = (auth: AuthModel) => {
    return jwt.sign({ authId: auth._id }, this.refreshTokenSecret, { expiresIn: '7d' });
  };

  public verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
  };
}
