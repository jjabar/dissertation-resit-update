import Animal from "../../models/animal.model.js";


const fetchAnimalsCtrl = async (req, res) => {

  const animals = await Animal.find({ userId: req?.userAuthId });
 
  return res.status(200).json({
    success: true,
    message: "Animals fetched successfully",
    animals
  })
}

export default fetchAnimalsCtrl
