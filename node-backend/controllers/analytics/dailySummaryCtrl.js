import Location from "../../models/location.model.js"

/** 
 ** @description Fetch latest iot data for map
 ** @param  request and response object
 ** @returns JSON success Boolean, message String, location Document
 ** @route POST /api/v1/stats/daily/:sensorTag
 ** @access PRIVATE
*/
const dailySummaryCtrl = async (req, res) => {
  const animalTag = req?.params?.sensorTag
  //get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const dailySummary = await Location.aggregate([
    {
      $match: {
        timestamp: {
          $gte: today,
        },
        animalTag: {
          $eq: animalTag,
        },
        
      },
    },
    {
      $group: {
        _id: null,
        minTemperature: { $min: "$temperature" },
        maxTemperature: { $max: "$temperature" },
        avgTemperature: { $avg: "$temperature" },
        minHeartbeat: { $min: "$heartbeat" },
        maxHeartbeat: { $max: "$heartbeat" },
        avgHeartbeat: { $avg: "$heartbeat" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        minTemperature: { $round: ["$minTemperature", 2] },
        maxTemperature: { $round: ["$maxTemperature", 2] },
        avgTemperature: { $round: ["$avgTemperature", 2] },
        minHeartbeat: { $round: ["$minHeartbeat", 2] },
        maxHeartbeat: { $round: ["$maxHeartbeat", 2] },
        avgHeartbeat: { $round: ["$avgHeartbeat", 2] },
        count: 1,
      },
    },
  ]);

  

  
  return res.status(200).json({
    success: true,
    message: "Summary fetched successfully",
    dailySummary
  });
}

export default dailySummaryCtrl