import mongoose, {Schema} from "mongoose";

const examinationSchema = new Schema(
  {
    animalTag: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    temperature: {
      type: Number,
      required: true,
    },
    heartBeat: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Examination = mongoose.model("Examination", examinationSchema);
export default Examination;