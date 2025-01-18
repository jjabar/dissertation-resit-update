import Animal from "../../models/animal.model.js";
import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";


const detachSensorCtrl = async (req, res) => {
  const id = req.params.id;
  const sensorTag = req.body.sensorNumber;
  //find animal

  const foundAnimal = await Animal.findById(id);

  if(!foundAnimal) {
    throw new ErrorHandler("Animal Not found", 404)
  }

  foundAnimal.sensorNumber = "";
  foundAnimal.isMonitored = false;

  await foundAnimal.save()

  const foundSensor = await Sensor.findOne({sensorTag});

  foundSensor.animal = "";
  foundSensor.isActivated = false;
  await foundSensor.save()
  
  return res.status(200).json({
    success: true,
    message: "Monitoring Stopped, sensor detached",
    animal: foundAnimal,
  })
}

export default detachSensorCtrl
