import express from 'express';
import { TrainerController } from '../../controllers/trainerControllers/trainer.controller';
import { AuthCheckVariable } from '../../controllers/authControllers/auth.check.variable';
import { TrainerProfileValidator } from '../middlewares/validation/trainerProfileValidation';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';

const router = express.Router();

const trainerRouter = (dependency:any) => {
  const trainerController = new TrainerController(dependency.trainerRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  const trainerProfileValidator= new TrainerProfileValidator()

  
  router.post('/create-profile', trainerProfileValidator.validateProfileData, verifyToken.verifyAccessToken, trainerController.createProfile);


  return router;
};

export default trainerRouter;

