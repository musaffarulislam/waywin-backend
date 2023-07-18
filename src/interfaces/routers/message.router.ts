import express from "express";
import { MessageController } from "../../controllers/messageControllers/message.controller";
import { VerifyTokenController } from "../../controllers/verifyToken.controller";


const router = express.Router();

const messageRouter = (dependency:any) => {
  const messageController = new MessageController(dependency.messageRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)

  router.get("/:chatId", verifyToken.verifyAccessToken, messageController.getAllMessages);
  router.post("/", verifyToken.verifyAccessToken, messageController.sendMessage); 


  return router;
};

export default messageRouter;