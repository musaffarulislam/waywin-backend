import express from 'express';
import { AuthController } from '../../controllers/authControllers/auth.controller';
import { AuthCheckVariable } from '../../controllers/authControllers/auth.check.variable';
import { AuthValidator } from '../middlewares/validation/authValidation';
import { VerifyTokenController } from '../../controllers/verifyToken.controller';

const router = express.Router();

const authRouter = (dependency:any) => {
  const authController = new AuthController(dependency.authRepository);
  const authCheckVariable = new AuthCheckVariable(dependency.authRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  const authValidator= new AuthValidator()

  router.post('/signup', authValidator.validateSignupData, authController.signup);
  router.post('/login', authValidator.validateLoginData, authController.login);

  router.get('/checkUsername/:username', verifyToken.verifyAccessToken , authCheckVariable.checkUsernameExist);
  router.get('/checkEmail/:email', authCheckVariable.checkEmailExist);
  router.get('/checkPhoneNumber/:phoneNumber', authCheckVariable.checkPhoneNumberExist);
  
  return router;
};

export default authRouter;

