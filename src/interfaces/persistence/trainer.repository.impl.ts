import TrainerModel, { ITrainer } from '../../interfaces/models/TrainerModel';
import cloudinary from '../config/cloudinary';

export class TrainerRepositoryImpl { 
  
  public async createTrainerProfile(trainerId: string, services: string[], description: string, tags: string[], experience: number, mode: string[]): Promise<void> {
    try {
      await TrainerModel.updateOne({authId: trainerId},
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

  public async uploadProfileImage(image: string, trainerId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"profileImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: trainerId},
        {$set:{
          "profileImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async uploadBannerImage(image: string, trainerId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"bannerImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: trainerId},
        {$set:{
          "bannerImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }


}
