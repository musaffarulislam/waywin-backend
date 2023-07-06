import { ITrainerProfile } from '../../../app/entity/trainer.entity';

export class UserService {

  constructor(private readonly userRepository: any) {
  }

  public async getAllTrainerInfo(){
    try{
      const allTrainersInfo = await this.userRepository.getAllTrainerInformation();
      const trainers = allTrainersInfo.filter((trainer: any) => trainer.isVerified && trainer.authId.isActive );
      return {trainers};
    }catch(error){
      throw error
    }
  }

 
}
