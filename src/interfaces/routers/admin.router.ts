import express from 'express';
import { AdminController } from '../../controllers/adminControllers/admin.controller';
import { AdminApproveController } from '../../controllers/adminControllers/admin.approve.controller';
import { TagController } from '../../controllers/trainerControllers/tag.controller';
import { TrainerProfileValidator } from '../middlewares/validation/trainerProfileValidation';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';


const router = express.Router();

const trainerRouter = (dependency:any) => {
  const adminController = new AdminController(dependency.adminRepository);
  const adminApproveController = new AdminApproveController(dependency.adminApproveRepository);
  const tagController = new TagController(dependency.tagRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  
  router.get('/getAll-user-info', verifyToken.verifyAccessToken, adminController.getAllUserInformation);
  router.get('/getActive-user-info', verifyToken.verifyAccessToken, adminController.getActiveUserInformation);
  router.get('/getInactive-user-info', verifyToken.verifyAccessToken, adminController.getInactiveUserInformation);

  router.get('/getAll-trainer-info', verifyToken.verifyAccessToken, adminController.getAllTrainerInformation);
  router.get('/getActive-trainer-info', verifyToken.verifyAccessToken, adminController.getActiveTrainerInformation);
  router.get('/getInactive-trainer-info', verifyToken.verifyAccessToken, adminController.getInactiveTrainerInformation);

  router.put('/change-auth-status', verifyToken.verifyAccessToken, adminApproveController.changeAuthStatus);
  router.put('/change-trainer-status', verifyToken.verifyAccessToken, adminApproveController.changeTrainerStatus);

  return router;
};

export default trainerRouter;
