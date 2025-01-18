import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

/** 
 ** @description Fetch latest iot data for map
 ** @param  request and response object
 ** @returns JSON success Boolean, message String, location Document
 ** @route POST /api/v1/location/sensors
 ** @access PRIVATE
*/
const fetchSensor = async (req, res) => {
    const {id} = req.params;
    const sensor = await Sensor.findById(id);
    if(!sensor) {
        throw new ErrorHandler("Sensor not found", 404)
    }

    return res.status(200).json({
        success: true,
        message: "All sensors fetched successfully.",
        sensor
    })
}

export default fetchSensor;