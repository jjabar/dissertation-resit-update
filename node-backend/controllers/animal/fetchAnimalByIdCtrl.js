import Animal from "../../models/animal.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";


const fetchAnimalByIdCtrl = async (req, res) => {

  const {id} = req.params
  const animal = await Animal.findById(id);
 
  if(!animal) {
    throw new ErrorHandler("No animal found", 404)
  }

  return res.status(200).json({
    success: true,
    message: "Animal fetched successfully",
    animal
  })
}

export default fetchAnimalByIdCtrl
