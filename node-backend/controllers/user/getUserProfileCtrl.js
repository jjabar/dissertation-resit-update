import User from "../../models/users.model.js"
import ErrorHandler from "../../utils/ErrorHandler.js"

const getUserProfileCtrl = async(req, res) => {
    //find user with Id

    const user = await User.findById(req.userAuthId).select("username email")

    //return error if user not found
    if(!user) throw new ErrorHandler("User not found", 404);


    //return response
    return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user,
    })
}

export default getUserProfileCtrl