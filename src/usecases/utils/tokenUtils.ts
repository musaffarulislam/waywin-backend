import jwt from "jsonwebtoken";
import { AuthModel } from "../../interfaces/models/AuthModel";

export class TokenUtils {
  public readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  public readonly refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  public generateAccessToken = (authId: AuthModel) => {
    try{
      return jwt.sign({ authId: authId }, this.accessTokenSecret, { expiresIn: "1d" });
    }catch (error){
      throw new Error("Errror : generate access token")
    }
  };

  public generateRefreshToken = (authId: AuthModel) => {
    try{
      return jwt.sign({ authId: authId }, this.refreshTokenSecret, { expiresIn: "7d" });
    }catch (error){
      throw new Error("Errro : generate refresh token")
    }
  };

  public generateAccessTokenAdmin = (email: string) => {
    try{
      return jwt.sign({ email: email }, this.accessTokenSecret, { expiresIn: "1d" });
    }catch (error){
      throw new Error("Errror : generate access token admin")
    }
  };

  public generateRefreshTokenAdmin = (email: string) => {
    try{
      return jwt.sign({ email: email }, this.refreshTokenSecret, { expiresIn: "7d" });
    }catch (error){
      throw new Error("Errror : generate refresh token admin")
    }
  };

  public verifyToken = (token: string, secret: string) => {
    try{
      return jwt.verify(token, secret);
    }catch (error){
      throw new Error("Errror : generate verify token")
    }
  };
}
