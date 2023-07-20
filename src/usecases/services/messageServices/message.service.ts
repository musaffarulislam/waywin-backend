
export class MessageService {

  constructor(private readonly messageRepository: any) {
  }

  public async getAllMessages(chatId:string){
    try{
      let messages = await this.messageRepository.getAllMessages(chatId); 
      return messages;
    }catch(error){
      throw error
    }
  }

  public async sendMessage(content: string, chatId: string, authId: string){
    try{ 
      const message = await this.messageRepository.createMessage(content, chatId, authId); 
      await this.messageRepository.changeLatestMessage(message, chatId); 
      return message
    }catch(error){
      throw error
    }
  }

 
}
