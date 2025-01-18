import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrHandler from "../middlewares/globalErrHandler.js";
import notFound from "../middlewares/notFoundErr.js";
import authRoutes from "../routes/authRoutes.js";
import locationRoutes from "../routes/locationRoutes.js";
import statsRoute from "../routes/statsRoute.js";
import userRoutes from "../routes/userRoutes.js";
import fileExportRoutes from "../routes/fileExportRoutes.js";
import sensorRoutes from "../routes/sensorRoutes.js";
import animalRoutes from "../routes/animalRoutes.js";
import examinationRoutes from "../routes/examinationRoutes.js";

const app = express();


app.use(cors())
app.use(express.json())
app.use(cookieParser())

const API_VERSION = process.env.API_VERSION;

app.use(`${API_VERSION}/auth`, authRoutes)
app.use(`${API_VERSION}/user`, userRoutes)
app.use(`${API_VERSION}/sensors`, sensorRoutes)
app.use(`${API_VERSION}/animals`, animalRoutes)
app.use(`${API_VERSION}/examinations`, examinationRoutes)
app.use(`${API_VERSION}/location`, locationRoutes)
app.use(`${API_VERSION}/stats`, statsRoute);
app.use(`${API_VERSION}/export-data`, fileExportRoutes);

app.get(`${API_VERSION}/`, (req, res) => {
    return res.status(200).json("Hello world");
})

app.use(notFound)
app.use(globalErrHandler)

export default app;