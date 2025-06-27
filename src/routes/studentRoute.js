import express from "express"
import { checkRole, jwtMiddleware } from "../middleware/authMiddleware.js"
import { updateStudentProfile } from "../controllers/studentController/updateProfile.js"
import { logout } from "../controllers/auth/logout.js"

const router = express.Router()

router.patch("/profile",jwtMiddleware,checkRole(["student"]),updateStudentProfile)
router.post("/logout",logout)

export default router