import express from "express";
import {
    getProfile,
    login,
    logout,
} from "../../controllers/auth/auth.controller.js";
import { protect } from "../../middlewares/auth.js";

const router = express.Router();

// router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

export default router;
