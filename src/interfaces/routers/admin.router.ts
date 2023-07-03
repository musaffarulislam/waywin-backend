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
  router.get('/getAll-trainer-info', verifyToken.verifyAccessToken, adminController.getAllTrainerInformation);
  
  router.put('/change-user-status', verifyToken.verifyAccessToken, adminApproveController.changeUserStatus);

  return router;
};

export default trainerRouter;
