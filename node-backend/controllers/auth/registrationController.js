import User from "../../models/users.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import bcrypt from "bcryptjs"


/** 
 ** @description Create User 
 ** @param username, email, password
 ** @returns JSON success Boolean, message String, user Document
 ** @route POST /api/v1/auth/register
 ** @access PUBLIC
*/
const registrationCtrl = async (req, res) => {
    const {username, email, password} = req?.body;

    if(!username || !email || !password) throw new ErrorHandler("Username, email and password must be present", 400)

    //find by username or password
    const existingUser = await User.findOne({$or:[{username: username.toLowerCase()},{email: email.toLowerCase()}]})
    
    if (existingUser)
      throw new ErrorHandler("user already exist make sure username and email is unique", 409);

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if(user){
        const { password, ...rest } = user._doc;
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: rest,
        });
    }

    throw new ErrorHandler("User cannot be created", 400)
    
}

export default registrationCtrl