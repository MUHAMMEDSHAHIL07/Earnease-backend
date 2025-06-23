import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const jwtMiddleware = (req, res, next) => {

    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "Access denied" })
    try {
       const verifytoken = jwt.verify(token,process.env.JWT_SECRET)
       req.user = verifytoken
       next()
    }
    catch(error){
        return res.status(401).json({message:"invalid token"})
    }
}

export const checkRole = (allowedRole) =>(req,res,next)=>{
    if(!allowedRole.includes(req.user.role)){
        return res.status(403).json({message:"Acces denied"})
    }
    next()
}