import express from "express";
import { adminRegister, employerRegister, userRegister } from "../controllers/auth/userRegister.js";
import { adminLogin, userLogin } from "../controllers/auth/login.js";

const router = express.Router();

router.post("/userregister", userRegister);
router.post("/employerregister", employerRegister);
router.post("/adminregister", adminRegister);
router.post("/login",userLogin)
router.post("adminlogin",adminLogin)
export default router;