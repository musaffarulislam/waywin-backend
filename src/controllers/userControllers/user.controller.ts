import {Request, Response } from 'express';
import { UserService } from '../../usecases/services/userServices/user.service';
import { ITrainerProfile } from '../../app/entity/trainer.entity'

interface CustomRequest extends Request {
    authId: string;
  }

export class UserController {
    private userService: UserService;

    constructor(private readonly dependency: any){
        this.userService = new UserService(this.dependency);
    }

    public getAllTrainerInfo = async (req: Request, res: Response) => {
        try{
            const getAllTrainers = await this.userService.getAllTrainerInfo();
            const trainers = getAllTrainers.trainers
            res.status(201).json({trainers})
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }

}