import express from "express";
import { sendOtp, verifyOtp, completeSignup, login, updateProfile, createProject, getProjects, deleteProject, logError, getUserErrors, getErrors, resolveError, changePassword, resetPassword} from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-signup", completeSignup);
router.post("/login", login);
router.put("/update-profile/:userId", authMiddleware, updateProfile)
router.get("/projects/:userId", authMiddleware, getProjects);
router.post("/createproject", authMiddleware, createProject);
router.delete("/delete/:id", authMiddleware, deleteProject);
router.get("/getUserErrors/:userId", authMiddleware, getUserErrors);
router.get("/geterrors/:projectId", authMiddleware, getErrors);
router.post("/errors", logError);
router.patch("/resolve-error/:id", authMiddleware, resolveError)
router.patch("/change-password/:userId", authMiddleware, changePassword);
router.patch("/reset-password", resetPassword);
export default router;