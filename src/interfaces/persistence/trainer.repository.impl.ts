import TrainerModel, { ITrainer } from '../../interfaces/models/TrainerModel';
import AuthModel from '../../interfaces/models/AuthModel';
import { ITrainerProfile } from '../../app/entity/trainer.entity';
import { Auth } from '../../app/entity/auth.entity';

export class TrainerRepositoryImpl {
  public async createTrainerProfile(trainerId: string, services: string[], description: string, tags: string[], experience: number, mode: string[], colorPalette: string): Promise<void> {
    try {
      console.log(services, description)
      await TrainerModel.updateOne({authId: trainerId},
        {$set: {
          'profile.services': services,
          'profile.description': description,
          'profile.tags': tags,
          'profile.experience': experience,
          'profile.mode': mode,
          'profile.colorPalette': colorPalette,
          'isProfile': true,
        }
      })
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

  public async findByAuthId(authId: string): Promise<ITrainer | null> {
    try{
      const trainer = await TrainerModel.findOne({authId}); 
      return trainer
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async findByAuthModel(authId: string): Promise<Auth | null> {
    return AuthModel.findById(authId)
}


}
