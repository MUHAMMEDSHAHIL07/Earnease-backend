import express from "express"
import { verifyEmployer } from "../controllers/employerController/verifyEmployer.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router()

router.post("/verify", upload.single("license"), verifyEmployer);

export default router