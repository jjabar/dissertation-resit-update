import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import createAnimalCtrl from "../controllers/animal/createAnimalCtrl.js";
import fetchAnimalsCtrl from "../controllers/animal/fetchAnimalsCtrl.js";
import detachSensorCtrl from "../controllers/animal/detachSensorCtrl.js";
import fetchAnimalByIdCtrl from "../controllers/animal/fetchAnimalByIdCtrl.js";
import updateAnimalCtrl from "../controllers/animal/updateAnimalCtrl.js";
import fetchActiveAnimalsCtrl from "../controllers/animal/fetchActiveAnimalsListCtrl.js";


const animalRoutes = express.Router();

animalRoutes
  .get("/", isLoggedIn, catchAsyncError(fetchAnimalsCtrl))
  .get("/active/get", isLoggedIn, catchAsyncError(fetchActiveAnimalsCtrl))
  .post("/", isLoggedIn, catchAsyncError(createAnimalCtrl))
  .get("/:id", isLoggedIn, catchAsyncError(fetchAnimalByIdCtrl))
  .patch("/:id", isLoggedIn, catchAsyncError(detachSensorCtrl))
  .put("/:id", isLoggedIn, catchAsyncError(updateAnimalCtrl))

export default animalRoutes;