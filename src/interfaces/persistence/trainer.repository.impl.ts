import mongoose, { Types } from 'mongoose';
import { ITrainerAvailableDate } from "../../app/entity/trainer.entity";
import TrainerModel, { ITrainer } from "../../interfaces/models/TrainerModel";
import cloudinary from "../config/cloudinary";
import BookingModel from "../models/BookingModel"; 

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}


interface ChartData {
  labels: string[];
  datasets: Dataset[];
}


export class TrainerRepositoryImpl { 
  
  public async createTrainerProfile(authId: string, services: string[], description: string, tags: string[], experience: number, mode: string[]): Promise<void> {
    try {
      await TrainerModel.updateOne({authId: authId},
        {$set: {
          "profile.services": services,
          "profile.description": description,
          "profile.tags": tags,
          "profile.experience": experience,
          "profile.mode": mode,
          "isProfile": true,
        }
      })
    } catch (error) {
      throw new Error("Failed to create trainer");
    }
  }

  public async addTrainerFee(authId: string, consultingFee: number, trainingFee: number): Promise<void> {
    try {
      await TrainerModel.updateOne({authId: authId},
        {$set: {
          "fee.consultingFee": consultingFee,
          "fee.trainingFee": trainingFee,
        }
      })
    } catch (error) {
      throw new Error("Failed to add fee trainer");
    }
  }

  public async findByAuthId(authId: string): Promise<ITrainer | null> {
    try{
      return await TrainerModel.findOne({authId}).populate("authId","-password"); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async uploadProfileImage(image: string, authId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"profileImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: authId},
        {$set:{
          "profileImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async uploadBannerImage(image: string, authId: string): Promise<ITrainer | null> {
    try{
      const result= await cloudinary.uploader.upload(image,{
        folder:"bannerImage"
      })
      const imageBuffer = {
          public_id:result.public_id,
          url:result.secure_url
        }
      return await TrainerModel.findOneAndUpdate({authId: authId},
        {$set:{
          "bannerImage" : imageBuffer
        }
      }, {new: true}); 
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async addTrainerAvailableDate( date: ITrainerAvailableDate, authId: string,): Promise<void> {
    try {
      const trainer = await TrainerModel.findOne({ authId: authId });
      if (trainer) {
        const existingDate = trainer.availableDates.find((d) => new Date(d.date).getTime() === new Date(date.date).getTime()); 
        if (existingDate) {
          existingDate.time = date.time;
        } else {
          trainer.availableDates.push(date);
        }
        await trainer.save();
        const trainer2 = await TrainerModel.findOne({ authId: authId }); 
      }
    } catch (error) { 
      throw new Error("Failed to add dates.");
    }
  }

  public async getBookingInformation(authId: string):Promise<any | null> {
    try{
      const trainerInfo = await TrainerModel.findOne({authId})
      return await BookingModel.find({trainerId: trainerInfo._id}).populate("userId").populate({path: "trainerId", populate: {path: "authId",select: "-password"}})
    }catch (error){
      throw new Error("Trainer not available")
    }
  }

  public async getChartMode(authId: string): Promise<ChartData | null> {
    try {
      const today = new Date();
      const last7Months = new Date(today.getFullYear(), today.getMonth() - 6);
  
      const trainerData = await TrainerModel.aggregate([
        {
          $match: {
            authId: new mongoose.Types.ObjectId(authId),
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: '_id',
            foreignField: 'trainerId',
            as: 'bookings',
          },
        },
        {
          $unwind: '$bookings',
        },
        {
          $match: {
            'bookings.mode': { $in: ['online', 'offline'] },
            'bookings.createdAt': { $gte: last7Months, $lte: today },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: { $toDate: '$bookings.createdAt' } },
            },
            onlineCount: {
              $sum: {
                $cond: [{ $eq: ['$bookings.mode', 'online'] }, 1, 0],
              },
            },
            offlineCount: {
              $sum: {
                $cond: [{ $eq: ['$bookings.mode', 'offline'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
  
      const labels: string[] = [];
      const onlineCounts: number[] = [];
      const offlineCounts: number[] = [];
  
      const currentMonthLabel = today.toISOString().slice(0, 7);
      if (!labels.includes(currentMonthLabel)) { 
          labels.push(currentMonthLabel);
          
          
        const data = trainerData.find((item) => item._id === currentMonthLabel);
        onlineCounts.push(data ? data.onlineCount : 0);
        offlineCounts.push(data ? data.offlineCount : 0);
      }

      for (let i = 0; i <7; i++) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() - i).toISOString().slice(0, 7);
        labels.unshift(currentMonth);
  
        const data = trainerData.find((item) => item._id === currentMonth);
        onlineCounts.unshift(data ? data.onlineCount : 0);
        offlineCounts.unshift(data ? data.offlineCount : 0);
      }
  
      const datasets: Dataset[] = [
        {
          label: 'Online Bookings',
          data: onlineCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Offline Bookings',
          data: offlineCounts,
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
      ];
  
      const chartData: ChartData = {
        labels,
        datasets,
      };
  
  
      return chartData;
    } catch (error) {
      throw new Error("Mode chart not available");
    }
  }

  public async getChartService(authId: string): Promise<ChartData | null> {
    try {
      const today = new Date();
      const last7Months = new Date(today.getFullYear(), today.getMonth() - 6);
  
      const trainerData = await TrainerModel.aggregate([
        {
          $match: {
            authId: new mongoose.Types.ObjectId(authId),
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: '_id',
            foreignField: 'trainerId',
            as: 'bookings',
          },
        },
        {
          $unwind: '$bookings',
        },
        {
          $match: {
            'bookings.service': { $in: ['consulting', 'training'] },
            'bookings.createdAt': { $gte: last7Months, $lte: today },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: { $toDate: '$bookings.createdAt' } },
            },
            consultingCount: {
              $sum: {
                $cond: [{ $eq: ['$bookings.mode', 'online'] }, 1, 0],
              },
            },
            serviceCount: {
              $sum: {
                $cond: [{ $eq: ['$bookings.mode', 'offline'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
  
      const labels: string[] = [];
      const consultingCounts: number[] = [];
      const serviceCounts: number[] = [];
  
      const currentMonthLabel = today.toISOString().slice(0, 7);
      if (!labels.includes(currentMonthLabel)) { 
          labels.push(currentMonthLabel);
          
          
        const data = trainerData.find((item) => item._id === currentMonthLabel);
        consultingCounts.push(data ? data.consultingCount : 0);
        serviceCounts.push(data ? data.serviceCount : 0);
      }

      for (let i = 0; i <7; i++) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() - i).toISOString().slice(0, 7);
        labels.unshift(currentMonth);
  
        const data = trainerData.find((item) => item._id === currentMonth);
        consultingCounts.unshift(data ? data.consultingCount : 0);
        serviceCounts.unshift(data ? data.serviceCount : 0);
      }
  
      const datasets: Dataset[] = [
        {
          label: 'Consulting Services',
          data: consultingCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Training Services',
          data: serviceCounts,
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
      ];
  
      const chartData: ChartData = {
        labels,
        datasets,
      };
  
  
      return chartData;
    } catch (error) {
      throw new Error("Trainer not available");
    }
  }

}
