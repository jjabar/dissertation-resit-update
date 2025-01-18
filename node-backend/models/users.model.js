import mongoose from "mongoose";

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {versionKey: false})

const User = mongoose.model("User", UserSchema);

export default User;