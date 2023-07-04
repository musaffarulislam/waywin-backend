import UserModel from "../models/UserModel";
import TrainerModel from "../models/TrainerModel";

export class AdminRepositoryImpl{
    
    public async getAllUserInformation():Promise<any | null> {
        try{
            return await UserModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async getAllTrainerInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

}