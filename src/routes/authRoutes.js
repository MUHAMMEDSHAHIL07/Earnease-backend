import express from "express";
import { adminRegister, employerRegister, userRegister } from "../controllers/auth/userRegister.js";
import { adminLogin, userLogin } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";

const router = express.Router();

router.post("/userregister", userRegister);
router.post("/employerregister", employerRegister);
router.post("/adminregister", adminRegister);
router.post("/login",userLogin)
router.post("/adminlogin",adminLogin)
router.delete("/logout",logout)
export default router;