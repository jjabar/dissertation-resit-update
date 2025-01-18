import Animal from "../../models/animal.model.js";
import Location from "../../models/location.model.js"

/** 
 ** @description Fetch latest iot data for alert
 ** @param  request and response object
 ** @returns JSON success Boolean, message String, location Document
 ** @route POST /api/v1/location/latest/alert
 ** @access PRIVATE
*/
const fetchAlertDataCtr = async (req, res) => {
    const activeAnimalsNumber = await Animal.find({isMonitored: true}).countDocuments();

    const latest = await Location.find({ userId: req?.userAuthId })
      .select("animalTag heartbeat temperature")
      .sort({ $natural: -1 })
      .limit(activeAnimalsNumber);

    
    let animalArray = [];
     latest.forEach(animal => {
      if (
        animal.temperature > 39.5 ||
        animal.temperature < 38 ||
        animal.heartbeat > 84 ||
        animal.heartbeat < 48
      ) {
        animalArray.push(animal)
      }
    }) 

    return res.status(200).json({
      success: true,
      message: "Alert record fetched successfully",
      latest: animalArray,
    });
}

export default fetchAlertDataCtr