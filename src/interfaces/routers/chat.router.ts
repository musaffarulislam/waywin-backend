import express from "express";
import { ChatController } from "../../controllers/chatControllers/chat.controller";
import { VerifyTokenController } from "../../controllers/verifyToken.controller";


const router = express.Router();

const chatRouter = (dependency:any) => {
  const chatController = new ChatController(dependency.chatRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)

  router.post("/", verifyToken.verifyAccessToken, chatController.accessChat);
  router.get("/", verifyToken.verifyAccessToken, chatController.fetchChat); 


  return router;
};

export default chatRouter;