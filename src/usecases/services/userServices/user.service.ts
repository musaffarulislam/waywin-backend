import Razorpay from 'razorpay';
import { ITrainerProfile } from '../../../app/entity/trainer.entity';
import { IBooking } from '../../../app/entity/user.entity';

export class UserService {

  constructor(private readonly userRepository: any) {
  }

  public async getAllTrainerInfo(){
    try{
      const allTrainersInfo = await this.userRepository.getAllTrainersInformation();
      const trainers = allTrainersInfo.filter((trainer: any) => trainer.isVerified && trainer.authId.isActive );
      return {trainers};
    }catch(error){
      throw error
    }
  }

  public async getTrainerInfo(trainerId: string){
    try{
      return await this.userRepository.getTrainerInformation(trainerId); 
    }catch(error){
      throw error
    }
  }

  public async booking(amount: number){
    try{
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const lastBooking = await this.userRepository.lastBooking();

      let bookingId = 'WAYWIN000001';
      if (lastBooking.length > 0) {
        const lastBookingId = lastBooking[0].bookingId;
        const bookingIdNumber = parseInt(lastBookingId.slice(6));
        bookingId = `WAYWIN${("000000" + (bookingIdNumber + 1)).slice(-6)}`;
      }

      const option = {
        receipt: bookingId,
        amount: amount*100,
        currency: "INR",
        payment_capture: 1
      }
  
      return await razorpayInstance.orders.create(option);

    }catch(error){
      throw error
    }
  }

  public async getBookingInformation(authId: string){
    try{
      return await this.userRepository.getBookingInformation(authId); 
    }catch(error){
      throw error
    }
  }

  public async bookingTrainer(bookingData: IBooking, trainerId: string, bookingId: string, orderId: string, authId: string){
    try{
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const order = await razorpayInstance.orders.fetch(orderId);

      if (!order) {
        throw new Error('Payment somthing wrong');
      } 

      if (order.status === "paid") {
        await this.userRepository.bookingTrainer(bookingData, trainerId, bookingId, authId);
        await this.userRepository.updateTrainerAvailableDate(bookingData.date, bookingData.time, trainerId)
      }
      
    }catch(error){
      throw error
    }
  }

 
}
