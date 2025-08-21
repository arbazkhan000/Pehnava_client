import express from "express";
import { authLimiter } from "../../utils/rateLimit.js";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", authLimiter, userController.register);

router.post("/login", authLimiter, userController.login);

router.get("/profile", authMiddleware, userController.profile);

export default router;
