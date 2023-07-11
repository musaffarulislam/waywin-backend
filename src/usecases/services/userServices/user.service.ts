import { ITrainerProfile } from '../../../app/entity/trainer.entity';
import { IBooking } from '../../../app/entity/user.entity';

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

  public async bookingTrainer(bookingdata: IBooking, trainerId: string, authId: string){
    try{
      await this.userRepository.bookingTrainer(bookingdata, trainerId, authId);
    }catch(error){
      throw error
    }
  }

 
}
