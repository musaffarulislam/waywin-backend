import { Request, Response } from 'express';
import { AuthService } from '../../usecases/services/auth.service';
import { Auth } from '../../app/entity/auth.entity';

export class AuthCheckVariable {
  private authService: AuthService;

  constructor(private readonly dependency: any) {
    this.authService = new AuthService(this.dependency);
  }

  public checkUsernameExist = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;    
      await this.authService.checkUsernameExist(username);
      res.status(200).json({message: "Username not registerd"})
    } catch (error) {
      res.status(400).json({ error: 'Username already exist' });
    }
  };

  public checkEmailExist = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
   
      await this.authService.checkEmailExist(email);
      res.status(200).json({message: "Email not registerd"})
    } catch (error) {
      res.status(400).json({ error: 'Email already exist' });
    }
  };

  public checkPhoneNumberExist = async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.params;    
      const phoneNumberAsNumber = Number(phoneNumber);
      await this.authService.checkPhoneNumberExist(phoneNumberAsNumber);
      res.status(200).json({message: "Phone number not registerd"})
    } catch (error) {
      res.status(400).json({ error: 'Phone number already exist' });
    }
  };
}
