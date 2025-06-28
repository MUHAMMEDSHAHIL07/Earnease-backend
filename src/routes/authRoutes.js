import express from "express";
import { adminRegister, employerRegister, userRegister } from "../controllers/auth/userRegister.js";
import { adminLogin, userLogin } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { forgetPassword } from "../controllers/auth/forgetPassword.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";
import { loginLimiter } from "../middleware/rateLimit.js";
import { GoogleLogin } from "../controllers/auth/googleAuth.js";

const router = express.Router();

router.post("/userregister", userRegister);
router.post("/employerregister", employerRegister);
router.post("/adminregister", adminRegister);
router.post("/login",userLogin)
router.post("/adminlogin",adminLogin)
router.post("/forgot-password",forgetPassword)
router.post('/googlelogin',GoogleLogin);
router.post("/reset-password/:token", resetPassword);
router.delete("/logout",logout)
export default router;