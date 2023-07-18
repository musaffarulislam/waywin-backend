import {Request, Response } from "express"; 
import { ChatService } from "../../usecases/services/chatServices/chat.service";
interface CustomRequest extends Request {
    authId: string;
  }

export class ChatController {
    private chatService: ChatService;

    constructor(private readonly dependency: any){
        this.chatService = new ChatService(this.dependency);
    }

    public accessChat = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId;
            const { userId } = req.body
            const chat = await this.chatService.accessChat(authId,userId); 
            res.status(201).json({chat})
        }catch(error){
            res.status(400).json({ error: error.message })
        }
    }


    public fetchChat = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId
            const chats = await this.chatService.fetchChat(authId)
            res.status(201).json({chats})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };


}