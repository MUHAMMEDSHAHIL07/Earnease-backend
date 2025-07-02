import express from "express"
import { verifyEmployer } from "../controllers/employerController/verifyEmployer.js";
import { upload } from "../config/cloudinary.js";
import { getAllJob, jobPost } from "../controllers/employerController/jobController.js";
import { jwtMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/verify", upload.single("license"), verifyEmployer);
router.post("/jobPost",jwtMiddleware,jobPost)
router.get("/getJob",jwtMiddleware,getAllJob)
export default router