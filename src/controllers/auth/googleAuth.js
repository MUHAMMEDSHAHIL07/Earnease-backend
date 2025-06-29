import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/userSchema.js";
import { employerModel } from "../../models/employerSchema.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleLogin = async (req, res) => {
  const { credential, role } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Missing credential" });
  }

  try {

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;


    const existingStudent = await userModel.findOne({ email });
    const existingEmployer = await employerModel.findOne({ email });


    if (!role) {
      if (existingStudent) {
        return res.json({ exists: true, role: "student", 
          user: {
        name: existingStudent.name,
        email: existingStudent.email,
        avatarUrl: payload.picture
      }});
      }
      if (existingEmployer) {
        return res.json({
          exists: true,
          role: "employer",
          verified: existingEmployer.verified,
          employerId: existingEmployer._id,
          user: {
        name: existingEmployer.companyname,
        email: existingEmployer.email,
        avatarUrl: payload.picture
        }});
      }

      return res.json({ exists: false });
    }

    if ((role === "student" && existingEmployer) ||
      (role === "employer" && existingStudent)) {
      return res.status(400).json({ message: "This email is already used with another email" });
    }

    let user = role === "student" ? existingStudent : existingEmployer;
    let isNew = false;

    if (!user) {
      if (role === "student") {
        user = await userModel.create({ name, email, googleId });
      } else {
        user = await employerModel.create({
          companyname: name,
          email,
          googleId,
          verified: false,
        });
      }
      isNew = true;
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true, sameSite: false });


    res.json({
      message: "Google login success",
      role,
      isNew,
      employerId: role === "employer" ? user._id : undefined,
      verified: role === "employer" ? user.verified : undefined,
      user: {
        name,
        email,
        avatarUrl: payload.picture
      },
    });
  } catch (error) {
    console.error("GoogleLogin error:", error);
    res.status(400).json({ message: "Google token invalid" });
  }
};
