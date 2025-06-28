import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {userModel} from "../../models/userSchema.js";     
import {employerModel} from "../../models/employerSchema.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleLogin = async (req, res) => {

  const { credential, role } = req.body;
  if (!credential || !role) {
    return res.status(400).json({ message: "Missing credential or role" });
  }

  try {

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user;
    let isNew = false;
    if (role === "student") {
      user = await userModel.findOne({ email });
      if (!user) {
        user = await userModel.create({
          name,
          email,
          googleId: payload.sub,
        });
        isNew = true;            
      }
    } else if (role === "employer") {
      user = await employerModel.findOne({ email });
      if (!user) {
        user = await employerModel.create({
          companyname: name,      
          email,
          googleId: payload.sub,

        });
        isNew = true;
      }
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }


    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" }); 
    res.json({
      message: "Google login success",
      role,
      isNew,
      employerId: role === "employer" ? user._id : undefined,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Google token invalid" });
  }
};
