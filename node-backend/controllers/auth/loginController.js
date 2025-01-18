import ErrorHandler from "../../utils/ErrorHandler.js";
import bcrypt from "bcryptjs";
import { genToken } from "../../utils/token.js";
import User from "../../models/users.model.js";


/** 
 ** @description Login User 
 ** @param  email, password
 ** @returns JSON success Boolean, message String, user Document, token String
 ** @route POST /api/v1/auth/register
 ** @access PUBLIC
*/
const loginCtrl = async (req, res) => {
    const {email, password} = req?.body;
   

    if(!email || !password) throw new ErrorHandler("Email and Password must be present", 400)

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if(!existingUser) throw new ErrorHandler("Invalid credentials", 403);
    
    
    const comparePassword = await bcrypt.compare(password, existingUser.password);

    if(comparePassword) {
        const token = genToken(existingUser._id)
        const { password, ...rest } = existingUser._doc;
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: rest,
            token,
        })
    }

    throw new ErrorHandler("Invalid credentials", 403)
}

export default loginCtrl