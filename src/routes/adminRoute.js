import express from"express"
import { approveEmployer, getPendingVerification, getSingleVerification, rejectEmployer } from "../controllers/adminContoller/adminVerificationController.js"
import { dashboardStat } from "../controllers/adminContoller/dashboardstats.js";

const router = express.Router()

router.get("/employers/pending",getPendingVerification)
router.get("/employers/pending/:id", getSingleVerification);
router.patch("/employers/approveEmployer/:id",approveEmployer)
router.patch("/employers/rejectEmployer/:id",rejectEmployer)
router.get("/dashboard-stats",dashboardStat)
export default router