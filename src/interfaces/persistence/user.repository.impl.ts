import TrainerModel from "../models/TrainerModel";
import BookingModel from "../models/BookingModel";
import { IBooking } from "../../app/entity/user.entity";

export class UserRepositoryImpl{
    
    public async getAllTrainerInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async bookingTrainer(bookingdata: IBooking, trainerId: string, authId: string): Promise<void> {
        try {
          const booking = new BookingModel({ 
            authId,
            trainerId,
            service: bookingdata.service,
            mode: bookingdata.mode,
            fee: bookingdata.fee,
            date: bookingdata.date,
            time: bookingdata.time,
           });
          await booking.save();
        } catch (error) {
          throw new Error('Failed to create user.');
        }
      }
}