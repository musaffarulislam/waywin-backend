import { Request, Response } from 'express';
import { AdminService } from '../../usecases/services/adminServices/admin.service';
import { Auth } from '../../app/entity/auth.entity';

export class AdminController {
    private adminService: AdminService;

    constructor(private readonly dependency: any){
        this.adminService = new AdminService(this.dependency)
    }

    public getAllUserInformation = async (req: Request, res: Response) => {
        try{
            const getAllUser = await this.adminService.getAllUserInformation();      
            const users = getAllUser.allUsersInfo
            res.status(201).json({ users });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public getAllTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getAllTrainer = await this.adminService.getAllTrainerInformation();      
            const trainers = getAllTrainer.allTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}