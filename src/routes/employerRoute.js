import express from "express"
import { verifyEmployer } from "../controllers/employerController/verifyEmployer.js";
import { upload } from "../config/cloudinary.js";
import { deleteJob, editJob, getAllJob, getJobById, jobPost } from "../controllers/employerController/jobController.js";
import { jwtMiddleware } from "../middleware/authMiddleware.js";
import { getEmployerApplication } from "../controllers/employerController/getEmployerAppplication.js";
import { editProfile } from "../controllers/employerController/editProfile.js";
import { getProfileEmployer } from "../controllers/employerController/getProfile.js";

const router = express.Router()

router.post("/verify", upload.single("license"), verifyEmployer);
router.post("/jobPost",jwtMiddleware,jobPost)
router.get("/getJobs",jwtMiddleware,getAllJob)
router.delete("/deleteJob/:id",jwtMiddleware,deleteJob)
router.get("/getJob/:id",jwtMiddleware,getJobById)
router.patch("/editjob/:id",jwtMiddleware,editJob)
router.get("/getApplication",jwtMiddleware,getEmployerApplication)
router.patch("/editprofile",jwtMiddleware,editProfile)
router.get("/getprofile",jwtMiddleware,getProfileEmployer)
export default router