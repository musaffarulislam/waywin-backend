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

    public getActiveUserInformation = async (req: Request, res: Response) => {
        try{
            const getActiveUser = await this.adminService.getActiveUserInformation();      
            const users = getActiveUser.activeUsersInfo
            res.status(201).json({ users });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public getInactiveUserInformation = async (req: Request, res: Response) => {
        try{
            const getUnactiveUser = await this.adminService.getInactiveUserInformation();      
            const users = getUnactiveUser.inactiveUsersInfo
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

    public getActiveTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getActiveTrainer = await this.adminService.getActiveTrainerInformation();      
            const trainers = getActiveTrainer.activeTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public getInactiveTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getInactiveTrainer = await this.adminService.getInactiveTrainerInformation();      
            const trainers = getInactiveTrainer.inactiveTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public getVerifyTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getVerifyTrainer = await this.adminService.getVerifyTrainerInformation();      
            const trainers = getVerifyTrainer.verifyTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public getUnverifyTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getUnverifyTrainer = await this.adminService.getUnverifyTrainerInformation();      
            const trainers = getUnverifyTrainer.unverifyTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }


}