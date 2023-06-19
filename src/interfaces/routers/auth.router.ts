import express from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { AuthValidator } from '../middlewares/validation/authValidation';

const router = express.Router();

const authRouter = (dependency:any) => {
  const authController = new AuthController(dependency.authRepository);
  const authValidator= new AuthValidator()

  router.post('/signup', authValidator.validateSignupData, authController.signup);
  router.post('/login', authValidator.validateLoginData, authController.login);

  router.get('/checkUsername/:username', authController.checkUsernameExist);
  router.get('/checkEmail/:email', authController.checkEmailExist);
  router.get('/checkPhoneNumber/:phoneNumber', authController.checkPhoneNumberExist);
  
  return router;
};

export default authRouter;

