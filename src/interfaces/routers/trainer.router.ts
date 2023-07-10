import express from 'express';
import { TrainerController } from '../../controllers/trainerControllers/trainer.controller';
import { TagController } from '../../controllers/trainerControllers/tag.controller';
import { TrainerProfileValidator } from '../middlewares/validation/trainerProfileValidation';
import { TrainerFeeValidator } from '../middlewares/validation/trainerFeeValidation';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';

const router = express.Router();

const trainerRouter = (dependency:any) => {
  const trainerController = new TrainerController(dependency.trainerRepository);
  const tagController = new TagController(dependency.tagRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  const trainerProfileValidator= new TrainerProfileValidator()
  const trainerFeeValidator= new TrainerFeeValidator()

  
  router.get('/getTrainer-info', verifyToken.verifyAccessToken, trainerController.getTrainerInfo);

  router.post('/create-profile', trainerProfileValidator.validateProfileData, verifyToken.verifyAccessToken, trainerController.createProfile);
  router.post('/add-trainer-fee', trainerFeeValidator.validateFeeData, verifyToken.verifyAccessToken, trainerController.addTrainerFee);
  router.post('/upload-profile-image',verifyToken.verifyAccessToken,trainerController.uploadProfileImage)
  router.post('/upload-banner-image',verifyToken.verifyAccessToken,trainerController.uploadBannerImage)

  router.post('/add-available-date',verifyToken.verifyAccessToken,trainerController.addTrainerAvailableDate)

  router.get('/getTrainer-profile', verifyToken.verifyAccessToken, trainerController.getTrainerProfile);
  router.get('/getTrainer-available-dates', verifyToken.verifyAccessToken, trainerController.getTrainerAvailableDate);
  
  router.get('/getTags', verifyToken.verifyAccessToken, tagController.getTags);

  return router;
};

export default trainerRouter;

