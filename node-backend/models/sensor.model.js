import mongoose, {Schema} from "mongoose";

const sensorSchema = new Schema({
    sensorTag: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false,
    },
    description: {
        type: String,
        required: true,
    },
    productNumber: {
        type: String,
        required: true,
        unique: true,
    },
    animal: {
        type: String,
    }
}, {timestamps: true});


const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;