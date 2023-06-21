import bcrypt from 'bcrypt';
import { TokenUtils } from '../../utils/tokenUtils';
import { ITrainerProfile } from '../../../app/entity/trainer.entity';

export class TrainerService {

  constructor(private readonly trainerRepository: any) {
  }

  public async getTrainerInfo(trainerId: string){
    try{
      const authInfo = await this.trainerRepository.findByAuthModel(trainerId);
      const trainerDetails = await this.trainerRepository.findByAuthId(trainerId);
      const isProfile = trainerDetails.isProfile;
      const selectedAuthInfo = {
        _id: authInfo._id,
        username: authInfo.username,
        email: authInfo.email,
        phoneNumber: authInfo.phoneNumber,
      };
      return {trainerInfo: selectedAuthInfo, isProfile};
    }catch(error){
      throw error
    }
  }

  public async createProfile({services, description, tags, experience, mode, colorPalette}: ITrainerProfile, trainerId: string){
    try{
      const trainer = await this.trainerRepository.findByAuthId(trainerId);
      await this.trainerRepository.createTrainerProfile(trainerId,services, description, tags, experience, mode, colorPalette);
    }catch(error){
      throw error
    }
  }

  public async getTrainerProfile(trainerId: string){
    try{
      const trainerInfo = await this.trainerRepository.findByAuthId(trainerId);
      const profileInfo = trainerInfo.profile
      console.log("profileInfo : ", profileInfo)
      return {profileInfo};
    }catch(error){
      throw error
    }
  }

}
