import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import fetchExaminationsCtrl from "../controllers/examination/fetchExaminationsCtrl.js";
import fetchExaminationByIdCtrl from "../controllers/examination/fetchExaminationByIdCtrl.js";
import createExaminationCtrl from "../controllers/examination/createExaminationCtrl.js";



const examinationRoutes = express.Router();

examinationRoutes
  .get("/", isLoggedIn, catchAsyncError(fetchExaminationsCtrl))
  .post("/", isLoggedIn, catchAsyncError(createExaminationCtrl))
  .get("/:id", isLoggedIn, catchAsyncError(fetchExaminationByIdCtrl))


export default examinationRoutes;