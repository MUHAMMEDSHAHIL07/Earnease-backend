import express from "express"
import { checkRole, jwtMiddleware } from "../middleware/authMiddleware.js"
import { updateStudentProfile } from "../controllers/studentController/updateProfile.js"

const router = express.Router()

router.patch("/profile",jwtMiddleware,checkRole(["student"]),updateStudentProfile)


export default router