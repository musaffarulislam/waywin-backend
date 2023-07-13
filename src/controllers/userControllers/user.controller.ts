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

    public getTrainerInfo = async (req: Request, res: Response) => {
        try{
            const trainerId = req.params.trainerId
            const trainer = await this.userService.getTrainerInfo(trainerId); 
            res.status(201).json({trainer})
        }catch(error){
            res.status(400).json({error: "Something wrong"})
        }
    }

    public booking = async (req: Request, res: Response) => {
        try{
            const { amount } = req.body;
            const booking = await this.userService.booking(amount)
            if (!booking) return res.status(500).send({error: "Please check internet connection"})
            res.status(201).json({ message: 'Trainer booking successfully', data: booking})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };

    public getBookingInformation = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId
            const bookings = await this.userService.getBookingInformation(authId)
            res.status(201).json({ bookings })
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };

    public bookingTrainer = async (req: CustomRequest, res: Response) => {
        try{
            const { bookingData, trainerId, bookingId, orderId} = req.body;
            const authId = req.authId
            await this.userService.bookingTrainer(bookingData, trainerId, bookingId, orderId, authId )
            res.status(201).json({ message: 'Trainer booking successfully'})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };

}