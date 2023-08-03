import AuthModel from "../models/AuthModel";
import UserModel from "../models/UserModel";
import TrainerModel from "../models/TrainerModel";
import TagsModel from "../models/TagModel";
import BookingModel from "../models/BookingModel";
interface ITagArray extends Array<string> {
    [index: number]: string;
  }

  interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string;
  }

export class AdminRepositoryImpl{
    
    public async getAllUserInformation():Promise<any | null> {
        try{
            return await UserModel.find().populate("authId","-password"); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async getAllTrainerInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate("authId","-password"); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async getAllTags():Promise<any | null> {
        try{
            return await TagsModel.findOne({}); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async addTag(tag: string):Promise<void> {
        const tags = await TagsModel.findOne({});
        if (tags) {
            const tagArray: any = tags.tags;
            tagArray.push(tag)
            await tags.save();  
        } else {
            throw new Error("Tags not found");
        }
    }

    public async editTag(index: number, tag: string):Promise<void> {
        const tags = await TagsModel.findOne({});
        if (tags) {
            const tagArray: any = tags.tags;
            tagArray[index] = tag;
            await tags.save(); 
        } else {
            throw new Error("Tags not found");
        }
    }

    public async deleteTag(index: number):Promise<void> {
        const tags = await TagsModel.findOne({});
        if (tags) {
            const tagArray: any = tags.tags;
            if (index >= 0 && index < tagArray.length) {
              tagArray.splice(index, 1); 
              await tags.save();  
            } else {
              throw new Error("Invalid index");
            }
       
        } else {
            throw new Error("Tags not found");
        }
    }

    public async getAllBookings():Promise<any | null> {
        try{
            return await BookingModel.find().populate("userId").populate({path: "trainerId", populate: {path: "authId",select: "-password"}}) 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async getChartData():Promise<any | null> {
        try { 
            const today = new Date();
            const last7Months = new Date(today.getFullYear(), today.getMonth() - 6); 
            const bookingData = await BookingModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: last7Months, $lte: today },  
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, 
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
             
            const authData = await AuthModel.aggregate([
              {
                $match: {
                  createdAt: { $gte: last7Months, $lte: today },
                },
              },
              {
                $group: {
                  _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                  count: { $sum: 1 },
                },
              },
              {
                $sort: { _id: 1 },
              },
            ]); 
          
            const labels: string[] = [];
            const datasets: Dataset[] = [ 
              {
                label: 'Booking Count',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Signup Count',
                data: [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ];
          
            const currentMonthLabel = today.toISOString().slice(0, 7);
            if (!labels.includes(currentMonthLabel)) { 
                labels.push(currentMonthLabel);

                const bookingCount = bookingData.find((item) => item._id === currentMonthLabel);
                datasets[0].data.push(bookingCount ? bookingCount.count : 0);

                const signupCount = authData.find((item) => item._id === currentMonthLabel);
                datasets[1].data.push(signupCount ? signupCount.count : 0);
            }
            
            for (let i = 0; i < 7; i++) {
                const currentMonth = new Date(today.getFullYear(), today.getMonth() - i).toISOString().slice(0, 7);
                labels.unshift(currentMonth);
                
                const bookingCount = bookingData.find((item) => item._id === currentMonth);
                datasets[0].data.unshift(bookingCount ? bookingCount.count : 0);
                
                const signupCount = authData.find((item) => item._id === currentMonth);
                datasets[1].data.unshift(signupCount ? signupCount.count : 0);
            }
            
          
            const chartData = {
              labels,
              datasets,
            };
          
            return chartData;
        }catch (error){
            throw new Error("Trainer not available")
        }
    }
}