import jwt from "jsonwebtoken";


export const genToken = (id) => {
    const token = jwt.sign({id}, process?.env?.TOKEN_KEY, {expiresIn: "7d"});
    return token
}

export const getTokenFromHeader = (req) => {
    const token = req?.headers?.authorization.split(' ')?.[1] || req?.headers?.Authorization.split(' ')?.[1]

    if(token === null || token === undefined) return null;

    return token;
}


export const verifyToken = (token) => {
    return jwt.verify(token, process?.env?.TOKEN_KEY, (err, decoded) => {
        if(err) {
            return null
        }else {
            return decoded
        }
    })
}