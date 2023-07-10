import { ITrainerAvailableDate, ITrainerFee, ITrainerProfile } from '../../../app/entity/trainer.entity';

export class TrainerService {

  constructor(private readonly trainerRepository: any) {
  }

  public async getTrainerInfo(authId: string){
    try{
      const trainerDetails = await this.trainerRepository.findByAuthId(authId);
      const isProfile = trainerDetails?.isProfile;
      const profileImage = trainerDetails?.profileImage?.url
      const selectedAuthInfo = {
        _id: trainerDetails?.authId?._id,
        username: trainerDetails?.authId?.username,
        email: trainerDetails?.authId?.email,
        phoneNumber: trainerDetails?.authId?.phoneNumber,
      };
      const fee = trainerDetails?.fee
      return {trainerInfo: selectedAuthInfo, isProfile, profileImage, fee};
    }catch(error){
      throw error
    }
  }

  public async createProfile({services, description, tags, experience, mode}: ITrainerProfile, authId: string){
    try{
      await this.trainerRepository.createTrainerProfile(authId,services, description, tags, experience, mode);
    }catch(error){
      throw error
    }
  }

  public async addTrainerFee({consultingFee, trainingFee}: ITrainerFee, authId: string){
    try{
      await this.trainerRepository.addTrainerFee(authId,consultingFee, trainingFee);
    }catch(error){
      throw error
    }
  }

  public async uploadProfileImage(image: string, authId: string){
    try{
      const trainer = await this.trainerRepository.uploadProfileImage(image,authId);
      const profileImage = trainer.profileImage?.url;
      return {profileImage}
    }catch(error){
      throw error 
    }
  }

  public async uploadBannerImage(image: string, authId: string){
    try{
      const trainer = await this.trainerRepository.uploadBannerImage(image,authId);
      const bannerImage = trainer.bannerImage?.url;
      return {bannerImage}
    }catch(error){
      throw error 
    }
  }

  public async getTrainerProfile(authId: string){
    try{
      const trainerInfo = await this.trainerRepository.findByAuthId(authId);
      const profileInfo = trainerInfo.profile
      return {profileInfo};
    }catch(error){
      throw error
    }
  }

  public async getTrainerAvailableDate(authId: string){
    try{
      const trainerInfo = await this.trainerRepository.findByAuthId(authId);
      const availabeDates = trainerInfo.availableDates
      return {availabeDates};
    }catch(error){
      throw error
    }
  }

  public async addTrainerAvailableDate(date: ITrainerAvailableDate,authId: string){
    try{
      console.log("date service :", date)
      await this.trainerRepository.addTrainerAvailableDate(date ,authId);
    }catch(error){
      throw error
    }
  }

}
