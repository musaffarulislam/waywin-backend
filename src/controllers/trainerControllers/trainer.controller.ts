import {Request, Response } from 'express';
import { TrainerService } from '../../usecases/services/trainerServices/trainer.service';
import { ITrainerProfile } from '../../app/entity/trainer.entity'

interface CustomRequest extends Request {
    authId: string;
  }

export class TrainerController {
    private trainerService: TrainerService;

    constructor(private readonly dependency: any){
        this.trainerService = new TrainerService(this.dependency);
    }

    public getTrainerInfo = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId;
            const trainerInfo = await this.trainerService.getTrainerInfo(authId);
            res.status(201).json(trainerInfo)
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }

    public createProfile = async (req: CustomRequest, res: Response) => {
        try{
            console.log(req.body)
            const {services, description, tags, experience, mode} = req.body;
            const authId = req.authId
            const trainerProfile: ITrainerProfile = {services, description, tags, experience, mode}
            await this.trainerService.createProfile(trainerProfile, authId )
            res.status(201).json({ message: 'Trainer profile created successfully'})
        }catch (error){
            res.status(500).json({error: 'Internal server error'})
        }
    };

    public getTrainerProfile = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId;
            const profileInfo = await this.trainerService.getTrainerProfile(authId);
            res.status(201).json(profileInfo)
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }
    
    public uploadProfileImage = async (req: CustomRequest, res: Response) => {
        try{
            const { image } = req.body;
            const authId = req.authId
            const profileImage = await this.trainerService.uploadProfileImage(image, authId )
            res.status(201).json(profileImage)
        }catch (error){
            res.status(500).json({error: 'Internal server error'})
        }
    };
   
    public uploadBannerImage = async (req: CustomRequest, res: Response) => {
        try{
            const { image } = req.body;
            const authId = req.authId
            const bannerImage = await this.trainerService.uploadBannerImage(image, authId )
            res.status(201).json(bannerImage)
        }catch (error){
            res.status(500).json({error: 'Internal server error'})
        }
    };

}