import express from "express";
import {
    createTimeRequest,
    deleteTimeRequest,
    getTimeRequestById,
    getTimeRequests,
    updateTimeRequest,
} from "../controllers/timeRequest.controller.js";

const router = express.Router();

router.get("/", getTimeRequests);
router.post("/", createTimeRequest);
router.get("/:id", getTimeRequestById);
router.put("/:id", updateTimeRequest);
router.delete("/:id", deleteTimeRequest);

export default router;
