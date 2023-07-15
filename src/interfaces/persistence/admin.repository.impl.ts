import UserModel from "../models/UserModel";
import TrainerModel from "../models/TrainerModel";
import TagsModel from "../models/TagModel";
import BookingModel from "../models/BookingModel";

interface ITagArray extends Array<string> {
    [index: number]: string;
  }

export class AdminRepositoryImpl{
    
    public async getAllUserInformation():Promise<any | null> {
        try{
            return await UserModel.find().populate('authId'); 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

    public async getAllTrainerInformation():Promise<any | null> {
        try{
            return await TrainerModel.find().populate('authId'); 
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
            return await BookingModel.find().populate("userId").populate({path: 'trainerId', populate: {path: 'authId'}}) 
        }catch (error){
            throw new Error("Trainer not available")
        }
    }

}