import UserModel from "../models/UserModel";
import AuthModel from "../models/AuthModel";
import TrainerModel from "../models/TrainerModel";

export class AdminApproveRepositoryImpl{
    public async changeUserStatus(authId: string):Promise<void> {
        try{
            const auth = await AuthModel.findById(authId);
            if (auth) {
                const newActive = !auth.isActive;
                await AuthModel.updateOne({ _id: authId }, { $set: { isActive: newActive } });
            } else {
                throw new Error("Auth not found");
            }
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