import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../usecases/services/authServices/auth.service';
import { ITrainer } from '../interfaces/models/TrainerModel';

interface CustomRequest extends Request {
    trainer?: ITrainer; // Add the 'trainer' property to the Request object
}

export class VerifyTokenController{
    private authService: AuthService;

    constructor(private readonly dependency: any) {
        this.authService = new AuthService(this.dependency);
    }


    public verifyAccessToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
        const accessToken: string | undefined = req.headers?.authorization?.split(" ")[1];
        const verifyToken: any = this.authService.verifyAccessToken(accessToken);
        if (!accessToken || !verifyToken) {
          console.log("No access token");
          return res.status(401).json({ error: 'Invalid access token' });
        }
        req.trainer = verifyToken;
        next();
    };


    public verifyRefreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        console.log("verfy refresh token :",refreshToken)
        const verifyToken = this.authService.verifyRefreshToken(refreshToken)
        if(!refreshToken || !verifyToken){
            console.log("No acces token")
            return res.status(403).json({ error: 'Invalid access token' })
        }
        const accessToken = this.authService.generateAccessToken(verifyToken);
        console.log("Verify Token : ",accessToken)
        res.status(200).json(accessToken);
    }
}