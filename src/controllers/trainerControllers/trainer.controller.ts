import {Request, Response } from 'express';
import { TrainerService } from '../../usecases/services/trainerServices/trainer.service';
import { ITrainerAvailableDate, ITrainerFee, ITrainerProfile } from '../../app/entity/trainer.entity'

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
            res.status(500).json({ error: error.message })
        }
    };

    public addTrainerFee = async (req: CustomRequest, res: Response) => {
        try{
            console.log(req.body)
            const {consultingFee, trainingFee} = req.body;
            const authId = req.authId
            const trainerFee: ITrainerFee = {consultingFee, trainingFee}
            await this.trainerService.addTrainerFee(trainerFee, authId )
            res.status(201).json({ message: 'Trainer fee added successfully'})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };
    
    public uploadProfileImage = async (req: CustomRequest, res: Response) => {
        try{
            const { image } = req.body;
            const authId = req.authId
            const profileImage = await this.trainerService.uploadProfileImage(image, authId )
            res.status(201).json(profileImage)
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };
    
    public uploadBannerImage = async (req: CustomRequest, res: Response) => {
        try{
            const { image } = req.body;
            const authId = req.authId
            const bannerImage = await this.trainerService.uploadBannerImage(image, authId )
            res.status(201).json(bannerImage)
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };
    
    public getTrainerProfile = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId;
            const profileInfo = await this.trainerService.getTrainerProfile(authId);
            res.status(201).json(profileInfo)
        }catch(error){
            res.status(400).json({ error: error.message })
        }
    }
    
    public getTrainerAvailableDate = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId;
            const availabeDates = await this.trainerService.getTrainerAvailableDate(authId);
            res.status(201).json(availabeDates)
        }catch(error){
            res.status(400).json({ error: error.message })
        }
    }
    
    public addTrainerAvailableDate = async (req: CustomRequest, res: Response) => {
        try{
            const { date, time } = req.body;
            const authId = req.authId;
            // const dateObj = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            const dateInfo: ITrainerAvailableDate = {date:date, time}
            await this.trainerService.addTrainerAvailableDate(dateInfo, authId )
            res.status(201).json({ message: 'Trainer profile created success'})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };

    public getBookingInformation = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId
            const bookings = await this.trainerService.getBookingInformation(authId)
            res.status(201).json({ bookings })
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };

}