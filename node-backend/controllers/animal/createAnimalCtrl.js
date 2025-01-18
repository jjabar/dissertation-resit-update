import Animal from "../../models/animal.model.js";
import Sensor from "../../models/sensor.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { genAnimalNumber } from "../../utils/genRandomNumber.js";


const createAnimalCtrl = async (req, res) => {
  
  const {weight, height, age, gender, description, sensorTag} = req.body;
  const sensor = await Sensor.findOne({sensorTag});
  const animalTag = await genAnimalNumber();

  const animal = await Animal.create({
    weight,
    height,
    age,
    gender,
    description,
    sensorNumber: sensorTag,
    animalTag,
    userId:  req?.userAuthId,
  }) 

  if(!animal) {
    throw new ErrorHandler("Unable to register new animal", 400);
  }

  sensor.isActivated = true;
  sensor.animal = animal.animalTag;
  await sensor.save();

  return res.status(200).json({
    success: true,
    message: "New animal registered",
    animal
  })
}

export default createAnimalCtrl
