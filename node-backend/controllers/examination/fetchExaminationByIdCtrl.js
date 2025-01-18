import Examination from "../../models/health.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";


const fetchExaminationByIdCtrl = async (req, res) => {

  const {id} = req.params
  const examination = await Examination.findById(id);
 
  if(!examination) {
    throw new ErrorHandler("No examination found", 404)
  }
  
  return res.status(200).json({
    success: true,
    message: "Examination fetched successfully",
    examination
  })
}

export default fetchExaminationByIdCtrl
