import TrainerModel from "../models/TrainerModel";

export class UserRepositoryImpl{
    
    public async getAllTrainerInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }
}