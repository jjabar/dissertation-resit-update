import Sensor from "../../models/sensor.model.js";

/** 
 ** @description Fetch latest iot data for map
 ** @param  request and response object
 ** @returns JSON success Boolean, message String, location Document
 ** @route POST /api/v1/location/sensors
 ** @access PRIVATE
*/
const fetchAllInactiveSensors = async (req, res) => {
    const sensors = await Sensor.find({
      isActivated: false,
      userId: req?.userAuthId,
    });

    return res.status(200).json({
        success: true,
        message: "All sensors fetched successfully.",
        sensors
    })
}

export default fetchAllInactiveSensors;