import bcrypt from 'bcrypt';
import { TokenUtils } from '../../utils/tokenUtils';
import { ITrainerProfile } from '../../../app/entity/trainer.entity';

export class TrainerService {

  constructor(private readonly trainerRepository: any) {
  }

  public async getTrainerInfo(trainerId: string){
    try{
      console.log("getTrainerInfo 1")
      const trainerDetails = await this.trainerRepository.findByAuthId(trainerId);
      const isProfile = trainerDetails?.isProfile;
      const profileImage = trainerDetails?.profileImage?.url
      const selectedAuthInfo = {
        _id: trainerDetails?.authId?._id,
        username: trainerDetails?.authId?.username,
        email: trainerDetails?.authId?.email,
        phoneNumber: trainerDetails?.authId?.phoneNumber,
      };
      return {trainerInfo: selectedAuthInfo, isProfile, profileImage};
    }catch(error){
      throw error
    }
  }

  public async createProfile({services, description, tags, experience, mode, colorPalette}: ITrainerProfile, trainerId: string){
    try{
      await this.trainerRepository.createTrainerProfile(trainerId,services, description, tags, experience, mode, colorPalette);
    }catch(error){
      throw error
    }
  }

  public async uploadProfileImage(image: string, trainerId: string){
    try{
      const trainer = await this.trainerRepository.uploadProfileImage(image,trainerId);
      const profileImage = trainer.profileImage?.url;
      return {profileImage}
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
