import ChatModel from "../models/ChatModel";
import MessageModel, { IMessage } from "../models/MessageModel";

export class MessageRepositoryImpl{
  
    public async getAllMessages(chatId: string):Promise<any | null> {
        try{
          return MessageModel.find({ chat: chatId })
          .populate("sender","-password -phoneNumber")
          .populate("chat");
        }catch (error){
            throw new Error("Oops! Not get messages")
        }
    }
        
    public async createMessage(content: string, chatId: string, authId: string): Promise<any | null> {
      try { 
        const newMessage = {
          sender: authId,
          content: content,
          chat: chatId,
        };
    
        let message: any = await MessageModel.create(newMessage);
        message = await MessageModel.findOne({_id: message._id}).populate("sender", "-password -phoneNumber").populate("chat"); 
        return message;
      } catch (error) {
        throw new Error("Oops! create chat error");
      }
    }
        
    public async changeLatestMessage(message: string, chatId: string): Promise<any | null> {
      try { 
        await ChatModel.findByIdAndUpdate(chatId, { latestMessage: message });
      } catch (error) {
        throw new Error("Oops! create chat error");
      }
    }  

}