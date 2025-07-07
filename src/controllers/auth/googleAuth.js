import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/userSchema.js";
import { employerModel } from "../../models/employerSchema.js";
import EmployerVerification from "../../models/employerVerifiySchema.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const isProd = process.env.NODE_ENV === "production";

export const GoogleLogin = async (req, res) => {
  const { credential, role } = req.body;


  if (!credential) return res.status(400).json({ message: "Missing credential" });

  try {
    const { payload } = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId, picture } = payload;

    const student = await userModel.findOne({ email });
    const employer = await employerModel.findOne({ email });

    if (!role) {
      if (student) return res.json({
        exists: true, role: "student", blocked: student.isBlocked,
        user: { name: student.name, email, avatarUrl: picture }
      });

      if (employer) {
        const v = await EmployerVerification.findOne({ employerId: employer._id });
        return res.json({
          exists: true, role: "employer", blocked: employer.isBlocked,
          verified: employer.isVerified, hasSubmittedVerification: !!v,
          employerId: employer._id,
          user: { name: employer.companyname, email, avatarUrl: picture }
        });
      }

      return res.json({ exists: false });
    }

    if ((role === "student" && employer) || (role === "employer" && student)) {
      return res.status(400).json({ message: "This e‑mail is already used with another role" });
    }

    let user = role === "student" ? student : employer;

    if (user && user.isBlocked) {
      return res.status(403).json({ blocked: true, role, message: "Your account is blocked." });
    }

    if (!user) {
      if (role === "student") {
        user = await userModel.create({ name, email, googleId });
      } else {
        user = await employerModel.create({ companyname: name, email, googleId, isVerified: false });
      }
    }

    if (user.isBlocked) {
      return res.status(403).json({ blocked: true, role, message: "Your account is blocked." });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,         
      sameSite: "None",     
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie set!");


    return res.json({
      message: "Google login success",
      role,
      employerId: role === "employer" ? user._id : undefined,
      verified: role === "employer" ? user.isVerified : undefined,
      user: { name, email, avatarUrl: picture }
    });
  } catch (error) {
    console.error("GoogleLogin error:", error);
    return res.status(400).json({ message: "Google token invalid" });
  }
};
