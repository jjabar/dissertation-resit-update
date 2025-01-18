import Animal from "../../models/animal.model.js";
import Location from "../../models/location.model.js"

/** 
 ** @description Fetch latest iot data for map
 ** @param  request and response object
 ** @returns JSON success Boolean, message String, location Document
 ** @route POST /api/v1/location/latest
 ** @access PRIVATE
*/
const fetchLatestDataCtr = async (req, res) => {
    const activeAnimalsNumber = await Animal.find({isMonitored: true}).countDocuments();

    const latest = await Location.find({ userId: req?.userAuthId })
      .select("animalTag longitude latitude")
      .sort({ $natural: -1 })
      .limit(activeAnimalsNumber);

    return res.status(200).json({
        success: true,
        message: "Latest record fetched successfully.",
        latest
    })
}

export default fetchLatestDataCtr;