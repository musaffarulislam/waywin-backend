import AuthModel from "../models/AuthModel";
import TrainerModel from "../models/TrainerModel";

export class AdminApproveRepositoryImpl{
    public async changeAuthStatus(authId: string):Promise<void> {
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

    public async trainerVerify(trainerId: string):Promise<void> {
        try{
            const trainer = await TrainerModel.findById(trainerId);
            if (trainer) {
                const newVerify = !trainer.isVerified;
                await TrainerModel.updateOne({ _id: trainerId }, { $set: { isVerified: newVerify } });
            } else {
                throw new Error("Auth not found");
            }
        }catch (error){
            throw new Error("Trainer not available")
        }
    }


}