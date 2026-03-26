import express from "express";
import { signup, verifyOtp, completeSignup, login} from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/complete-signup", completeSignup);
router.post("/login", login);

export default router;