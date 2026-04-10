import express from "express";
import { sendOtp, verifyOtp, completeSignup, login, createProject, getProjects, deleteProject, logError, getErrors, resolveError} from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { get } from "mongoose";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-signup", completeSignup);
router.post("/login", login);
router.get("/projects/:userId", authMiddleware, getProjects);
router.post("/createproject", authMiddleware, createProject);
router.delete("/delete/:id", authMiddleware, deleteProject);
router.get("/geterrors/:projectId", authMiddleware, getErrors);
router.post("/errors", logError);
router.patch("/resolve-error/:id", authMiddleware, resolveError)
export default router;