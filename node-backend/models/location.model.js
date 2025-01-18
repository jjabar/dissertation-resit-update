import mongoose from "mongoose";

const Schema = mongoose.Schema;
const locationSchema = new Schema({
  sensorTag: {
    type: String,
    ref: "Sensor",
    required: true,
  },
  animalTag: {
    type: String,
    ref: "Animal",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  slug: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  heartbeat: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});


const Location = mongoose.model("Location", locationSchema);
export default Location;

