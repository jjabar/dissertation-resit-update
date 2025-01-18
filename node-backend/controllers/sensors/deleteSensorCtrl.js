import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

const deleteSensorCtrl = async (req, res) => {
    const {id} = req.params;

    const deletedSensor = await Sensor.findByIdAndDelete(id);

    if(!deletedSensor) {
        throw new ErrorHandler("Sensor could not be deleted", 400);
    }

    return res.status(200).json({
        success: true,
        message: `Sensor ${deletedSensor.sensorTag} deleted`,
        sensor: deletedSensor,
    })
}

export default deleteSensorCtrl;