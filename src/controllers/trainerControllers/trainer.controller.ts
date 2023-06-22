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

    public getTrainerInfo = async (req: CustomRequest, res: Response) => {
        try{
            const trainerId = req.trainer?.authId;
            const trainerInfo = await this.trainerService.getTrainerInfo(trainerId);
            res.status(201).json(trainerInfo)
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
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

    public uploadProfileImage = async (req: CustomRequest, res: Response) => {
        try{
            const { image } = req.body;
            const trainerId = req.trainer?.authId
            console.log(trainerId)
            const profileImage = await this.trainerService.uploadProfileImage(image, trainerId )
            res.status(201).json(profileImage)
        }catch (error){
            res.status(500).json({error: 'Internal server error'})
        }
    };

    public getTrainerProfile = async (req: CustomRequest, res: Response) => {
        try{
            const trainerId = req.trainer?.authId;
            const profileInfo = await this.trainerService.getTrainerProfile(trainerId);
            res.status(201).json(profileInfo)
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }
}