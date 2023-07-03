import { Request, Response } from 'express';
import { AdminApproveService } from '../../usecases/services/adminServices/admin.approve.service';
import { Auth } from '../../app/entity/auth.entity';

export class AdminController {
    private adminApproveService: AdminApproveService;

    constructor(private readonly dependency: any){
        this.adminApproveService = new AdminApproveService(this.dependency)
    }

    public changeUserStatus = async (req: Request, res: Response) => {
        try{
            const {userId} = req.body;
            await this.adminApproveService.changeUserStatus(userId);      
            res.status(201).json({ message: "User status change is success" });
        }catch(error){
            res.status(400).json({ error: 'Internal server error'});
        }
    }

}