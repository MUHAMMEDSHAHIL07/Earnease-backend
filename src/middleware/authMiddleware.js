import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userModel } from "../models/userSchema.js";
import { employerModel } from "../models/employerSchema.js";
dotenv.config()

export const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    let user;
    if (role === "student") {
      user = await userModel.findById(id);
    } else if (role === "employer") {
      user = await employerModel.findById(id);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message});
  }
};

export const checkRole = (allowedRole) =>(req,res,next)=>{
    if(!allowedRole.includes(req.user.role)){
        return res.status(403).json({message:"Acces denied"})
    }
    next()
}