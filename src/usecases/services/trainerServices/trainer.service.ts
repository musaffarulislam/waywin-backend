import bcrypt from 'bcrypt';
import { TokenUtils } from '../../utils/tokenUtils';
import { ITrainerProfile } from '../../../app/entity/trainer.entity';

export class TrainerService {

  constructor(private readonly trainerRepository: any) {
  }

  public async createProfile({services, description, tags, experience, mode, colorPalette}: ITrainerProfile, trainerId: string){
    try{
      const trainer = await this.trainerRepository.findByAuthId(trainerId);
      console.log("Trainer : ", trainer)
      await this.trainerRepository.createTrainerProfile(trainerId,services, description, tags, experience, mode, colorPalette);
    }catch(error){
      throw error
    }
  }

}
