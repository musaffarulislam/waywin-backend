import TrainerModel from "../models/TrainerModel";
import ChatModel from "../models/ChatModel";

export class ChatRepositoryImpl{
    
    public async checkChatIsExist(authId: string, userId: string):Promise<any | null> {
        try{
          return await ChatModel.find({
            $and: [
              { users: { $elemMatch: { $eq: authId} } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users", "-password")
            .populate("latestMessage")
        }catch (error){
            throw new Error("Check chat is not available")
        }
    }
    
    public async createChat(authId: string, userId: string):Promise<any | null> {
        try{
          const chatData = {
            chatName: "sender", 
            users: [authId, userId],
          }
          const createdChat = await ChatModel.create(chatData);
          return await ChatModel.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );

        }catch (error){
            throw new Error("Oops! create chat to error")
        }
    }
    
    public async getAllChats(authId: string):Promise<any | null> {
        try{
          console.log("authId :",authId)
          return await ChatModel.find({ users: { $elemMatch: { $eq: authId } } })
          .populate("users", "-password") 
          .populate("latestMessage")
          .populate({
            path: "latestMessage",
            populate: {
              path: "sender",
              select: "-password -phoneNumber",
            },
          })
          .sort({ updatedAt: -1 })
        }catch (error){
            throw new Error("Oops! create chat to error")
        }
    }

}