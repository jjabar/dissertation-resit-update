import express from "express";
import ExpressValidation from "express-joi-validation";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import registrationCtrl from "../controllers/auth/registrationController.js";
import loginCtrl from "../controllers/auth/loginController.js";
import { loginSchema, registerSchema } from "../validators/validators.js";

const authRoutes = express.Router();

const validator = ExpressValidation.createValidator({});

authRoutes
  .post("/register", validator.body(registerSchema), catchAsyncError(registrationCtrl))
  .post("/login", validator.body(loginSchema), catchAsyncError(loginCtrl));

export default authRoutes;