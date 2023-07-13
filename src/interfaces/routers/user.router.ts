import express from 'express';
import { UserController } from '../../controllers/userControllers/user.controller';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';


const router = express.Router();

const userRouter = (dependency:any) => {
  const userController = new UserController(dependency.userRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)

  
  router.get('/getAll-trainer-info', userController.getAllTrainerInfo);
  router.get('/get-trainer-info/:trainerId', userController.getTrainerInfo);
  
  router.get('/get-booking-info', verifyToken.verifyAccessToken, userController.getBookingInformation);

  router.post('/booking', verifyToken.verifyAccessToken, userController.booking);
  router.post('/book-trainer', verifyToken.verifyAccessToken, userController.bookingTrainer);


  return router;
};

export default userRouter;
