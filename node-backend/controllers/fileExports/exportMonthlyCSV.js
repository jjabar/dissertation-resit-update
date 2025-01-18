import csv from "json2csv"
import Location from "../../models/location.model.js";

const CsvParser = csv.Parser;

const exportMonthlyData = async (req, res) => {
    let locations = [];
    const date = new Date();
     const month = new Date(
       date.getFullYear(),
       date.getMonth(),
     );
    const sensors = await Location.find({
      timestamp: { $gte: month },
      userId: req?.userAuthId,
    });


    sensors.forEach((sensor) => {
        const {_id, sensorTag, animalTag, longitude, latitude, temperature, heartbeat, timestamp} = sensor;
        locations.push({
          _id,
          animalTag,
          sensorTag,
          longitude,
          latitude,
          temperature,
          heartbeat,
          timestamp,
        });
    }) 

    const csvFields = ["Id", "animalTag", "SensorTag", "Longitude", "Latitude", "Temperature", "Heartbeat", "Timestamp"];

    const csvParser =  new CsvParser({ csvFields });
    const csvData = csvParser.parse(locations)
    const filename =   Date.now();
    
    res.attachment(`${filename}.csv`);
    return res.status(200).send(csvData);

    
    
}

export default exportMonthlyData