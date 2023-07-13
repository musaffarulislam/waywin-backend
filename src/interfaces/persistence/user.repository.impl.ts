import TrainerModel from "../models/TrainerModel";
import BookingModel from "../models/BookingModel";
import { IBooking } from "../../app/entity/user.entity";

export class UserRepositoryImpl{
    
    public async getAllTrainersInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainers not available")
        }
    }
    
    public async getTrainerInformation(trainerId: string):Promise<any | null> {
        try{
            return await TrainerModel.findOne({_id: trainerId}).populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async lastBooking(): Promise<any | null> {
        try {
          return await BookingModel.find().sort({ _id: -1 }).limit(1)
        } catch (error) {
          throw new Error('Last booking is failed');
        }
      }

    
    public async getBookingInformation(authId: string):Promise<any | null> {
      try{
        return await BookingModel.find({userId: authId}).populate('trainerId').populate({path: 'trainerId', populate: {path: 'authId'}}); 
      }catch (error){
        throw new Error("Trainer not available")
      }
    }

    public async bookingTrainer(bookingData: IBooking, trainerId: string, bookingId: string, authId: string): Promise<void> {
        try {
          const booking = new BookingModel({ 
            userId: authId,
            trainerId,
            bookingId,
            service: bookingData.service,
            mode: bookingData.mode,
            fee: bookingData.fee,
            date: bookingData.date,
            time: bookingData.time,
           });
          await booking.save();
        } catch (error) {
          console.log("Error : ",error)
          throw new Error('Failed to create user.');
        }
      }

      public async updateTrainerAvailableDate(date: Date, time: string, trainerId: string): Promise<void> {
        try {
          const trainer = await TrainerModel.findOneAndUpdate(
            { _id: trainerId, "availableDates.date": date },
            { $pull: { "availableDates.$.time": time } }
          );
          console.log("Updated Trainer: ", trainer);
        } catch (error) {
          throw new Error('Failed to update trainer available date.');
        }
      }
}