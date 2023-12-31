import express from "express";
import { AdminController } from "../../controllers/adminControllers/admin.controller";
import { AdminApproveController } from "../../controllers/adminControllers/admin.approve.controller";
import { TagController } from "../../controllers/trainerControllers/tag.controller";
import { TrainerProfileValidator } from "../middlewares/validation/trainerProfileValidation";
import { VerifyTokenController } from "../../controllers/verifyToken.controller";


const router = express.Router();

const trainerRouter = (dependency:any) => {
  const adminController = new AdminController(dependency.adminRepository);
  const adminApproveController = new AdminApproveController(dependency.adminApproveRepository);
  const tagController = new TagController(dependency.tagRepository);
  const verifyToken = new VerifyTokenController(dependency.authRepository)
  
  router.get("/getAll-user-info", verifyToken.verifyAccessToken, adminController.getAllUserInformation);
  router.get("/getActive-user-info", verifyToken.verifyAccessToken, adminController.getActiveUserInformation);
  router.get("/getInactive-user-info", verifyToken.verifyAccessToken, adminController.getInactiveUserInformation);

  router.get("/getAll-trainer-info", verifyToken.verifyAccessToken, adminController.getAllTrainerInformation);
  router.get("/getActive-trainer-info", verifyToken.verifyAccessToken, adminController.getActiveTrainerInformation);
  router.get("/getInactive-trainer-info", verifyToken.verifyAccessToken, adminController.getInactiveTrainerInformation);
  router.get("/getVerify-trainer-info", verifyToken.verifyAccessToken, adminController.getVerifyTrainerInformation);
  router.get("/getUnverify-trainer-info", verifyToken.verifyAccessToken, adminController.getUnverifyTrainerInformation);

  router.get("/getAll-tags", verifyToken.verifyAccessToken, adminController.getAllTags);
  router.put("/add-tag", verifyToken.verifyAccessToken, adminController.addTag);
  router.put("/edit-tag", verifyToken.verifyAccessToken, adminController.editTag);
  router.delete("/delete-tag/:index", verifyToken.verifyAccessToken, adminController.deleteTag);

  router.get("/getAll-bookings", verifyToken.verifyAccessToken, adminController.getAllBookings);

  router.put("/change-auth-status", verifyToken.verifyAccessToken, adminApproveController.changeAuthStatus);
  router.put("/trainer-verify", verifyToken.verifyAccessToken, adminApproveController.trainerVerify);

  router.get("/getChart-data", verifyToken.verifyAccessToken, adminController.getChartData);

  return router;
};

export default trainerRouter;
