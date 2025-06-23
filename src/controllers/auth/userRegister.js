import bcrypt from "bcryptjs";
import { userModel } from "../../models/userSchema.js";
import { adminModel } from "../../models/adminSchema.js";
import { employerModel } from "../../models/employerSchema.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: hashedPassword, role: "student" });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const employerRegister = async(req,res)=>{
  try{
    const {companyname,email,password} = req.body
    const userExist = await employerModel.findOne({email})
    if(userExist){
      return res.status(400).json({message:"user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await employerModel.create({companyname,email,password:hashedPassword,role:"employer"})
    return res.status(200).json({message:"account created succesfully"})
  }
  catch(error){
    return res.status(500).json({message:"internal server error"+error.message})
  }
}

export const adminRegister = async(req,res)=>{
  try{
    const {name,email,password} = req.body
    const userExist = await adminModel.findOne({email})
    if(userExist){
      return res.status(400).json({message:"user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await adminModel.create({name,email,password:hashedPassword,role:"admin"})
    return res.status(200).json({message:"account created succesfully"})
  }
  catch(error){
    return res.status(500).json({message:"internal server error"+error.message})
  }
}