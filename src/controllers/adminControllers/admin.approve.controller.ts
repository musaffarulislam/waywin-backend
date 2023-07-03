import { Request, Response } from 'express';
import { AdminApproveService } from '../../usecases/services/adminServices/admin.approve.service';
import { Auth } from '../../app/entity/auth.entity';

export class AdminApproveController {
    private adminApproveService: AdminApproveService;

    constructor(private readonly dependency: any){
        this.adminApproveService = new AdminApproveService(this.dependency)
    }

    public changeUserStatus = async (req: Request, res: Response) => {
        try{
            const {authId} = req.body;
            console.log("USer Id :", authId)
            await this.adminApproveService.changeUserStatus(authId);      
            res.status(201).json({ message: "User status change is success" });
        }catch(error){
            res.status(400).json({ error: 'Internal server error'});
        }
    }

}