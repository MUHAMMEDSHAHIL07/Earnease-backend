import express from "express";
import { userRegister } from "../controllers/auth/userRegister.js";

const router = express.Router();

router.post("/register", userRegister);

export default router;