import jwt from 'jsonwebtoken';
import { AuthModel } from '../../interfaces/models/AuthModel';

export class TokenUtils {
  public readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  public readonly refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  public generateAccessToken = (authId: AuthModel) => {
    return jwt.sign({ authId: authId }, this.accessTokenSecret, { expiresIn: '1d' });
  };

  public generateRefreshToken = (authId: AuthModel) => {
    return jwt.sign({ authId: authId }, this.refreshTokenSecret, { expiresIn: '7d' });
  };

  public generateAccessTokenAdmin = (email: string) => {
    return jwt.sign({ email: email }, this.accessTokenSecret, { expiresIn: '1d' });
  };

  public generateRefreshTokenAdmin = (email: string) => {
    return jwt.sign({ email: email }, this.refreshTokenSecret, { expiresIn: '7d' });
  };

  public verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
  };
}
