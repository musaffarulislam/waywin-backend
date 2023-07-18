import { Request, Response } from "express";
import { AdminApproveService } from "../../usecases/services/adminServices/admin.approve.service";
import { Auth } from "../../app/entity/auth.entity";

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
            res.status(400).json({ error: error.message });
        }
    }
  
    public trainerVerify = async (req: Request, res: Response) => {
        try{
            const {trainerId} = req.body; 
            await this.adminApproveService.trainerVerify(trainerId);      
            res.status(201).json({ message: "Trainer verified changed" });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }

}