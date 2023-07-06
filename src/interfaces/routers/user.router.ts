import express from 'express';
import { UserController } from '../../controllers/userControllers/user.controller';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';


const router = express.Router();

const userRouter = (dependency:any) => {
  const userController = new UserController(dependency.userRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)

  
  router.get('/getAll-trainer-info', userController.getAllTrainerInfo);


  return router;
};

export default userRouter;
