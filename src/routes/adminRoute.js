import express from"express"
import { dashboardStat } from "../controllers/adminContoller/dashboardstats.js";
import { BlockUnblockStudent, getAllStudent } from "../controllers/adminContoller/studentController.js";
import { approveEmployer, getPendingVerification, getSingleVerification, rejectEmployer } from "../controllers/adminContoller/VerificationController.js";
import { BlockUnblockEmployer, getEmployer } from "../controllers/adminContoller/employerController.js";


const router = express.Router()

router.get("/employers/pending",getPendingVerification)
router.get("/employers/pending/:id", getSingleVerification);
router.patch("/employers/approveEmployer/:id",approveEmployer)
router.patch("/employers/rejectEmployer/:id",rejectEmployer)
router.get("/getAllStudent",getAllStudent)
router.get("/getAllEmployer",getEmployer)
router.patch("/userStatus/:id",BlockUnblockStudent)
router.patch("/employerStatus/:id",BlockUnblockEmployer)
router.get("/dashboard-stats",dashboardStat)
export default router