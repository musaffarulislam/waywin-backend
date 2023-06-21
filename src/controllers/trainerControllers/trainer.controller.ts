import {Request, Response } from 'express';
import { TrainerService } from '../../usecases/services/trainerServices/trainer.service';
import { ITrainerProfile } from '../../app/entity/trainer.entity'

interface CustomRequest extends Request {
    trainer?: {
      authId: string;
    };
  }

export class TrainerController {
    private trainerService: TrainerService;

    constructor(private readonly dependency: any){
        this.trainerService = new TrainerService(this.dependency);
    }

    public createProfile = async (req: CustomRequest, res: Response) => {
        try{
            const {services, description, tags, experience, mode, colorPalette} = req.body;
            const trainerId = req.trainer?.authId
            console.log(trainerId)
            const trainerProfile: ITrainerProfile = {services, description, tags, experience, mode, colorPalette}
            await this.trainerService.createProfile(trainerProfile, trainerId )
            res.status(201).json({ message: 'Trainer profile created successfully'})
        }catch (error){
            res.status(500).json({error: 'Internal server error'})
        }
    };
}