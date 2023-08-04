import express from "express";
import { AuthController, AuthGetController } from "../../controllers/authControllers/auth.controller";
import { AuthCheckVariable } from "../../controllers/authControllers/auth.check.variable";
import { AuthValidator } from "../middlewares/validation/authValidation";
import { VerifyTokenController } from "../../controllers/verifyToken.controller";

const router = express.Router();

const authRouter = (dependency:any) => {
  const authController = new AuthController(dependency.authRepository);
  const authGetController = new AuthGetController(dependency.authRepository);
  const authCheckVariable = new AuthCheckVariable(dependency.authRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  const authValidator= new AuthValidator()

  
  router.post("/signup", authValidator.validateSignupData, authController.signup);
  router.post("/login", authValidator.validateLoginData, authController.login);
  router.post("/token", verifyToken.verifyRefreshToken);

  router.get("/otp-generate", authController.otpGenerate);
  router.get("/otp-verify", authController.otpVerify);

  router.get("/getAuth-info", verifyToken.verifyAccessToken,authGetController.getAuthInformation);

  router.get("/checkUsername/:username", authCheckVariable.checkUsernameExist);
  router.get("/checkEmail/:email", authCheckVariable.checkEmailExist);
  router.get("/checkPhoneNumber/:phoneNumber", authCheckVariable.checkPhoneNumberExist);

  router.post("/update-username", authCheckVariable.checkPhoneNumberExist);
  
  return router;
};

export default authRouter;

