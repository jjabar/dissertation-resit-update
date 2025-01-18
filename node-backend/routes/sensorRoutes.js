import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import fetchAllSensors from "../controllers/sensors/fetchAllSensors.js";
import createSensorCtrl from "../controllers/sensors/createSensorCtrl.js";
import deleteSensorCtrl from "../controllers/sensors/deleteSensorCtrl.js";
import fetchSensor from "../controllers/sensors/fetchSensor.js";
import updateSensorCtrl from "../controllers/sensors/updateSensorCtrl.js";
import fetchAllInactiveSensors from "../controllers/sensors/fetchAllInactiveSensors.js";


const sensorRoutes = express.Router();

sensorRoutes
  .get("/", isLoggedIn, catchAsyncError(fetchAllSensors))
  .post("/", isLoggedIn, catchAsyncError(createSensorCtrl))
  .get("/:id", isLoggedIn, catchAsyncError(fetchSensor))
  .get("/get/inactive", isLoggedIn, catchAsyncError(fetchAllInactiveSensors))
  .delete("/:id", isLoggedIn, catchAsyncError(deleteSensorCtrl))
  .put("/:id", isLoggedIn, catchAsyncError(updateSensorCtrl))

export default sensorRoutes;