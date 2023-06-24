import express from 'express';
import { TrainerController } from '../../controllers/trainerControllers/trainer.controller';
import { TagController } from '../../controllers/trainerControllers/tag.controller';
import { TrainerProfileValidator } from '../middlewares/validation/trainerProfileValidation';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';

const router = express.Router();

const trainerRouter = (dependency:any) => {
  const trainerController = new TrainerController(dependency.trainerRepository);
  const tagController = new TagController(dependency.tagRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  const trainerProfileValidator= new TrainerProfileValidator()

  
  router.get('/getTrainer-info', verifyToken.verifyAccessToken, trainerController.getTrainerInfo);

  router.post('/create-profile', trainerProfileValidator.validateProfileData, verifyToken.verifyAccessToken, trainerController.createProfile);
  router.post('/upload-profile-image',verifyToken.verifyAccessToken,trainerController.uploadProfileImage)
  router.get('/getTrainer-profile', verifyToken.verifyAccessToken, trainerController.getTrainerProfile);
  
  router.get('/getTags', verifyToken.verifyAccessToken, tagController.getTags);

  return router;
};

export default trainerRouter;

