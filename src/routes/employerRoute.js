import express from "express"
import { verifyEmployer } from "../controllers/employerController/verifyEmployer.js";
import { upload } from "../config/cloudinary.js";
import { jobPost } from "../controllers/employerController/jobController.js";
import { jwtMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/verify", upload.single("license"), verifyEmployer);
router.post("/jobPost",jwtMiddleware,jobPost)
export default router