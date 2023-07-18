import {Request, Response } from "express"; 
import { MessageService } from "../../usecases/services/messageServices/message.service";
interface CustomRequest extends Request {
    authId: string;
  }

export class MessageController {
    private messageService: MessageService;

    constructor(private readonly dependency: any){
        this.messageService = new MessageService(this.dependency);
    }

    public getAllMessages = async (req: CustomRequest, res: Response) => {
        try{
            const { chatId } = req.params; 
            const messages = await this.messageService.getAllMessages(chatId); 
            res.status(201).json({messages})
        }catch(error){
            res.status(400).json({ error: error.message })
        }
    }


    public sendMessage = async (req: CustomRequest, res: Response) => {
        try{
            const authId = req.authId
            const { content, chatId } = req.body;
            if (!content || !chatId) {
                throw new Error ("Invalid credintials")
            }
            const message = await this.messageService.sendMessage(content, chatId, authId)
            res.status(201).json({message})
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    };


}