import express from "express";
import catchAsyncError from "../middlewares/catchAsyncErr.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import exportDailyData from "../controllers/fileExports/exportDailyCSV.js";
import exportMonthlyData from "../controllers/fileExports/exportMonthlyCSV.js";
import exportYearlyData from "../controllers/fileExports/exportYearlyCSV.js";
import exportAllTimeData from "../controllers/fileExports/exportAllTimeCSV.js";

const fileExportRoutes = express.Router();

fileExportRoutes
  .get("/today", isLoggedIn, catchAsyncError(exportDailyData))
  .get("/monthly", isLoggedIn, catchAsyncError(exportMonthlyData))
  .get("/yearly", isLoggedIn, catchAsyncError(exportYearlyData))
  .get("/all-time", isLoggedIn, catchAsyncError(exportAllTimeData))

export default fileExportRoutes;
