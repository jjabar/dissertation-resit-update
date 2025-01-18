import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { genSensorNumber } from "../../utils/genRandomNumber.js";

const createSensorCtrl = async (req, res) => {
    const { description, productNumber } = req?.body;
    const sensorTag = await genSensorNumber();
    const sensor = await Sensor.create({
        sensorTag,
        productNumber,
        description,
        userId: req?.userAuthId,
    })

    if(!sensor) {
        throw new ErrorHandler("Oops sensor could not be created", 400)
    }

    return res.status(200).json({
        success: true,
        message: "Sensor created successfully",
        sensor 
    })
}

export default createSensorCtrl