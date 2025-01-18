import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import fetchAlertDataCtr from "../controllers/location/fetchAlertDataCtr.js";
import fetchLatestDataCtr from "../controllers/location/fetchLatestDataCtr copy.js";


const locationRoutes = express.Router();

locationRoutes
  .get("/latest", isLoggedIn, catchAsyncError(fetchLatestDataCtr))
  .get("/latest/alert",  isLoggedIn,  catchAsyncError(fetchAlertDataCtr));

export default locationRoutes;