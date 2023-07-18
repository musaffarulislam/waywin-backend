import { Request, Response } from "express";
import { AdminService } from "../../usecases/services/adminServices/admin.service";
import { Auth } from "../../app/entity/auth.entity";

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
            res.status(500).json({ error: error.message});
        }
    }

    public getActiveUserInformation = async (req: Request, res: Response) => {
        try{
            const getActiveUser = await this.adminService.getActiveUserInformation();      
            const users = getActiveUser.activeUsersInfo
            res.status(201).json({ users });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getInactiveUserInformation = async (req: Request, res: Response) => {
        try{
            const getUnactiveUser = await this.adminService.getInactiveUserInformation();      
            const users = getUnactiveUser.inactiveUsersInfo
            res.status(201).json({ users });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getAllTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getAllTrainer = await this.adminService.getAllTrainerInformation();      
            const trainers = getAllTrainer.allTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getActiveTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getActiveTrainer = await this.adminService.getActiveTrainerInformation();      
            const trainers = getActiveTrainer.activeTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getInactiveTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getInactiveTrainer = await this.adminService.getInactiveTrainerInformation();      
            const trainers = getInactiveTrainer.inactiveTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getVerifyTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getVerifyTrainer = await this.adminService.getVerifyTrainerInformation();      
            const trainers = getVerifyTrainer.verifyTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getUnverifyTrainerInformation = async (req: Request, res: Response) => {
        try{
            const getUnverifyTrainer = await this.adminService.getUnverifyTrainerInformation();      
            const trainers = getUnverifyTrainer.unverifyTrainersInfo
            res.status(201).json({ trainers });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public getAllTags = async (req: Request, res: Response) => {
        try{
            const getAllTags = await this.adminService.getAllTags();      
            const tags = getAllTags.tags
            res.status(201).json({ tags });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }

    public addTag = async (req: Request, res: Response) => {
        try{
            const {addTag} = req.body;
            await this.adminService.addTag(addTag);      
            res.status(201).json({ message: "Tag added is success" });
        }catch(error){
            res.status(400).json({ error: error.message});
        }
    }

    public editTag = async (req: Request, res: Response) => {
        try{
            const {index, tag} = req.body;
            await this.adminService.editTag(index, tag);      
            res.status(201).json({ message: "Tag edited is success" });
        }catch(error){
            res.status(400).json({ error: error.message});
        }
    }

    public deleteTag = async (req: Request, res: Response) => {
        try{
            const index = req.params.index;
            await this.adminService.deleteTag(Number(index));      
            res.status(201).json({ message: "Tag delete is success" });
        }catch(error){
            res.status(400).json({ error: error.message});
        }
    }

    public getAllBookings = async (req: Request, res: Response) => {
        try{
            const bookings = await this.adminService.getAllBookings();       
            res.status(201).json({ bookings });
        }catch(error){
            res.status(500).json({ error: error.message});
        }
    }
}