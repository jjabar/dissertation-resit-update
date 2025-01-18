import Animal from "../../models/animal.model.js";


const fetchActiveAnimalsCtrl = async (req, res) => {

  const animals = await Animal.find({
    isMonitored: true,
    userId: req?.userAuthId,
  }).select("animalTag");
  const newAnimalArray = animals.map(animal => {
    return animal.animalTag;
  })
  return res.status(200).json({
    success: true,
    message: "Animals fetched successfully",
    animals: newAnimalArray
  })
}

export default fetchActiveAnimalsCtrl
