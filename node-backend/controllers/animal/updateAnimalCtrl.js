import Animal from "../../models/animal.model.js";
import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";


const updateAnimalCtrl = async (req, res) => {
  const id = req.params.id;
  const { weight, height, age, gender, description, sensorTag } = req.body;
  const sensor = await Sensor.findOne({sensorTag});
 

  const updatedAnimal = await Animal.findByIdAndUpdate(id, {
    weight, height, age, gender, description, sensorNumber: sensorTag, isMonitored: true
  })
  
  if (!updatedAnimal) {
    throw new ErrorHandler("Unable to register new animal", 400);
  }

  sensor.isActivated = true;
  sensor.animal = updatedAnimal.animalTag;
  await sensor.save();

  return res.status(200).json({
    success: true,
    message: "New animal registered",
    animal: updatedAnimal
  })
}

export default updateAnimalCtrl
