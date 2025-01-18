import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import getUserProfileCtrl from "../controllers/user/getUserProfileCtrl.js";


const userRoutes = express.Router();

userRoutes
  .get("/profile", isLoggedIn,  catchAsyncError(getUserProfileCtrl))

export default userRoutes;