import UserModel from "../models/UserModel";
import TrainerModel from "../models/TrainerModel";

export class AdminRepositoryImpl{
    public async changeUserStatus(userId: string):Promise<void> {
        try{
            await UserModel.updateOne({_id: userId },{
                $set: {
                    isStatus: !isStatus;
                }
            }) 
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