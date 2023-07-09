import { ITrainerAvailableDate } from '../../app/entity/trainer.entity';
import TrainerModel, { ITrainer } from '../../interfaces/models/TrainerModel';
import cloudinary from '../config/cloudinary';

export class TrainerRepositoryImpl { 
  
  public async createTrainerProfile(authId: string, services: string[], description: string, tags: string[], experience: number, mode: string[]): Promise<void> {
    try {
      await TrainerModel.updateOne({authId: authId},
        {$set: {
          'profile.services': services,
          'profile.description': description,
          'profile.tags': tags,
          'profile.experience': experience,
          'profile.mode': mode,
          'isProfile': true,
        }
      })
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

  public async findByAuthId(authId: string): Promise<ITrainer | null> {
    try{
      return await TrainerModel.findOne({authId}).populate('authId'); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async uploadProfileImage(image: string, authId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"profileImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: authId},
        {$set:{
          "profileImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async uploadBannerImage(image: string, authId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"bannerImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: authId},
        {$set:{
          "bannerImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async addTrainerAvailableDate( date: ITrainerAvailableDate, authId: string,): Promise<void> {
    try {
      console.log("dates :", date)
      const trainer = await TrainerModel.findOne({ authId: authId });
      if (trainer) {
        const existingDate = trainer.availableDates.find((d) => d.date.getTime() === date.date.getTime());
        if (existingDate) {
          existingDate.time = date.time;
        } else {
          trainer.availableDates.push(date);
        }
        await trainer.save();
        const trainer2 = await TrainerModel.findOne({ authId: authId });
        console.log("Trainer: ",trainer2.availableDates)
      }
    } catch (error) {
      throw new Error('Failed to add dates.');
    }
  }


}
