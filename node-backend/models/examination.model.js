import mongoose from "mongoose";

const Schema = mongoose.Schema;
const examinationSchema = new Schema({
  animalTag: {
    type: String,
    ref: "Animal",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});


const Examination = mongoose.model("Location", examinationSchema);
export default Examination;

