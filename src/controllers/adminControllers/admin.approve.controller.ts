import { Request, Response } from 'express';
import { AdminApproveService } from '../../usecases/services/adminServices/admin.approve.service';
import { Auth } from '../../app/entity/auth.entity';

export class AdminApproveController {
    private adminApproveService: AdminApproveService;

    constructor(private readonly dependency: any){
        this.adminApproveService = new AdminApproveService(this.dependency)
    }

    public changeAuthStatus = async (req: Request, res: Response) => {
        try{
            const {authId} = req.body;
            await this.adminApproveService.changeAuthStatus(authId);      
            res.status(201).json({ message: "Auth status change is success" });
        }catch(error){
            res.status(400).json({ error: 'Internal server error'});
        }
    }

    public changeTrainerStatus = async (req: Request, res: Response) => {
        try{
            const {authId} = req.body;
            await this.adminApproveService.changeTrainerStatus(authId);      
            res.status(201).json({ message: "Trainer status change is success" });
        }catch(error){
            res.status(400).json({ error: 'Internal server error'});
        }
    }

}