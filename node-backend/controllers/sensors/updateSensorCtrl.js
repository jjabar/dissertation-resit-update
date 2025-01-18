import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

const updateSensorCtrl = async (req, res) => {
    const {id} = req.params
    const { description, productNumber } = req?.body;
    const sensor = await Sensor.findByIdAndUpdate(id,{
        productNumber,
        description,
    }, {new: true})

    if(!sensor) {
        throw new ErrorHandler("Oops sensor could not be updated", 400)
    }

    return res.status(200).json({
        success: true,
        message: "Sensor updated successfully",
        sensor 
    })
}

export default updateSensorCtrl