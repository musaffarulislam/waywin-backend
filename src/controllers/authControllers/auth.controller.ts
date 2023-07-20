import { Request, Response } from "express";
import { AuthService } from "../../usecases/services/authServices/auth.service";
import { Auth } from "../../app/entity/auth.entity";

interface CustomRequest extends Request {
  authId: string;
}

export class AuthController {
  private authService: AuthService;

   constructor(private readonly dependency: any) {
    this.authService = new AuthService(this.dependency);
  }

  public signup = async (req: Request, res: Response) => {
    try {
      const { username, email, phoneNumber, role, password } = req.body;
      const auth: Auth = { username, email, phoneNumber, role, password }
      await this.authService.signup(auth);      
      res.status(201).json({ message: "User created successfully"});
    } catch (error) {
      res.status(500).json({ error: "Internal server error"});
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.status(200).json(tokens);
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
  };

}

export class AuthGetController {
  private authService: AuthService;

  constructor(private readonly dependency: any) {
    this.authService = new AuthService(this.dependency);
  }

  public getAuthInformation = async (req: CustomRequest, res: Response) => {
    try{
        const authId = req.authId;
        const authInfo = await this.authService.getAuthInformation(authId);
        res.status(201).json(authInfo)
    }catch(error){
        res.status(400).json({error: "Something wrong"})
    }
}

}
