import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../usecases/services/auth.service';

export class VerifyTokenController{
    private authService: AuthService;

    constructor(private readonly dependency: any) {
        this.authService = new AuthService(this.dependency);
    }

    public verifyAccessToken =  async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.headers?.authorization)
        const access_token: string | undefined = req.headers?.authorization?.split(" ")[1];
        const verify_token = this.authService.verifyAccessToken(access_token)
        if(!access_token || !verify_token){
            console.log("No acces token")
            return res.status(401).json({ error: 'Invalid access token' })
        }
        next();
    }
}