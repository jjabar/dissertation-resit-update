import Location from "../../models/location.model.js"

const hourlySummaryCtrl = async (req, res) => {
  /**
   ** @description Fetch hourly iot data for a sensor
   ** @param  request and response object
   ** @returns JSON success Boolean, message String, location Document
   ** @route POST /api/v1/stats/hourly/:sensorTag
   ** @access PRIVATE
   */

  const animalTag = req?.params?.sensorTag;
  //get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const hourlySummary = await Location.aggregate([
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
        _id: {
          $hour: {
            date: "$timestamp",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        },
        avgTemperature: { $avg: "$temperature" },
        avgHeartbeat: { $avg: "$heartbeat" },

        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 1,
        avgTemperature: { $round: ["$avgTemperature", 2] },
        avgHeartbeat: { $round: ["$avgHeartbeat", 2] },
        count: 1,
      },
    },
  ]).sort({ _id: 1 });
  
  const convertedObject = { labels: [], averageTemp: [], averageHeartBeat: [], count: 0 };

  hourlySummary.forEach((item) => {
    
    convertedObject.labels.push(item._id);
    convertedObject.averageTemp.push(item.avgTemperature);
    convertedObject.averageHeartBeat.push(item.avgHeartbeat);
    convertedObject.count += item.count
 })
 
  return res.status(200).json({
    success: true,
    message: "Summary fetched successfully",
   
    data:convertedObject
  });
}

export default hourlySummaryCtrl