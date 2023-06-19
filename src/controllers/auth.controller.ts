import { Request, Response } from 'express';
import { AuthService } from '../usecases/services/auth.service';
import { Auth } from '../app/entity/auth.entity';

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
      res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error'});
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.status(200).json(tokens);
    } catch (error) {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  };

  public checkUsernameExist = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;    
      await this.authService.checkUsernameExist(username);
      res.status(200).json({message: "Username not registerd"})
    } catch (error) {
      res.status(401).json({ error: 'Username already exist' });
    }
  };

  public checkEmailExist = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
   
      await this.authService.checkEmailExist(email);
      res.status(200).json({message: "Email not registerd"})
    } catch (error) {
      res.status(401).json({ error: 'Email already exist' });
    }
  };

  public checkPhoneNumberExist = async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.params;    
      const phoneNumberAsNumber = Number(phoneNumber);
      await this.authService.checkPhoneNumberExist(phoneNumberAsNumber);
      res.status(200).json({message: "Phone number not registerd"})
    } catch (error) {
      res.status(401).json({ error: 'Phone number already exist' });
    }
  };
}
