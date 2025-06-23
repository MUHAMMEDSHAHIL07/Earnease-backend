import express from "express";
import { userRegister } from "../controllers/auth/userRegister";

const router = express.Router();

router.post("/register", userRegister);

export default router;