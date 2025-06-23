import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userModel } from "../../models/userSchema.js";
import { employerModel } from "../../models/employerSchema.js";
import { adminModel } from "../../models/adminSchema.js";
dotenv.config()

export const userLogin = async (req, res) => {
    try {
        const { role, email, password } = req.body
        let user;
        if (role === "student") {
            user = await userModel.findOne({ email })
        }
        else if (role == "employer") {
            user = await employerModel.findOne({ email })
        }
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        const passwordmatch = await bcrypt.compare(password, user.password)
        if (!passwordmatch) {
            return res.status(401).json({ message: "invalid password" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({
            message: "login successfully"
        })
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admincheck = await adminModel.findOne({ email: email, role: "admin" })
        if (!admincheck) return res.status(400).json({ message: "not a admin" })
        const passwordmatch = bcrypt.compare(password, admincheck.password)
        if (!passwordmatch) return res.status(401).json({ message: "invalid password" })
        const token = jwt.sign({ id: admincheck._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({message:"login succesfully"})
    }
    catch(error){
        return res.status(500).json({message:"internal server error"+error.message})
    }
}