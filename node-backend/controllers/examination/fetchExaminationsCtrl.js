import Examination from "../../models/health.model.js";


const fetchExaminationsCtrl = async (req, res) => {

  const examinations = await Examination.find({ userId: req?.userAuthId });
 
  return res.status(200).json({
    success: true,
    message: "Examinations fetched successfully",
    examinations
  })
}

export default fetchExaminationsCtrl
