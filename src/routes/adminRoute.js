import express from"express"
import { approveEmployer, getPendingVerification, getSingleVerification, rejectEmployer } from "../controllers/adminContoller/adminVerificationController.js"

const router = express.Router()

router.get("/employers/pending",getPendingVerification)
router.patch("/approveEmployer/:id",approveEmployer)
router.get("/employers/pending/:id", getSingleVerification);
router.patch("/rejectEmployer/:id",rejectEmployer)

export default router