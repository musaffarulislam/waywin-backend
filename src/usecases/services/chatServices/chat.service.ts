
export class ChatService {

  constructor(private readonly chatRepository: any) {
  }

  public async accessChat(authId:string, userId:string){
    try{
      let isChat = await this.chatRepository.checkChatIsExist(authId, userId);  
      if(isChat.length>0){ 
        isChat = isChat[0]
        return isChat
      }else{
        const fullChat = await this.chatRepository.createChat(authId, userId); 
        return fullChat
      }
      // return {isChat};
    }catch(error){
      throw error
    }
  }

  public async fetchChat(authId: string){
    try{
      const chats = await this.chatRepository.getAllChats(authId);  
      return chats
    }catch(error){
      throw error
    }
  }

 
}
