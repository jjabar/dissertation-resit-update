import Examination from "../../models/health.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";


const createExaminationCtrl = async (req, res) => {
  
  const {animalTag, weight, height, temperature, heartBeat, age, gender, comment} = req.body;
 

  const examination = await Examination.create({
    weight,
    height,
    age,
    temperature,
    heartBeat,
    gender,
    comment,
    animalTag,
    userId: req?.userAuthId,
  }); 

  if(!examination) {
    throw new ErrorHandler("Unable to create new examination", 400);
  }

  
  return res.status(200).json({
    success: true,
    message: "New examination created",
    examination
  })
}

export default createExaminationCtrl
