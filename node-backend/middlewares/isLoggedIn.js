import ErrorHandler from "../utils/ErrorHandler.js";
import { getTokenFromHeader, verifyToken } from "../utils/token.js"

const isLoggedIn = (req, res, next) => {
    //get token
    const token = getTokenFromHeader(req);
    
    //return error if token is not found
    if(!token)  throw new ErrorHandler("No token present", 403);
    
    // verify token 
    const verified= verifyToken(token);
    
    //return error
    if(!verified) throw new ErrorHandler("Token no longer valid", 403) 

    //add id as userAuthId to request object
    req.userAuthId = verified?.id;

    next()
}

export default isLoggedIn