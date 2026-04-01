import express from "express";
import { sendOtp, verifyOtp, completeSignup, login} from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-signup", completeSignup);
router.post("/login", login);

export default router;