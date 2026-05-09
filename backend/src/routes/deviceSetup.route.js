import express from "express";
import {
    createDevice,
    getDeviceDetailById,
    getDeviceDetails,
    updateDevice,
} from "../controllers/deviceSetup.controller.js";

const router = express.Router();

router.get("/", getDeviceDetails);
router.post("/", createDevice);
router.put("/:id", updateDevice);
router.get("/:id", getDeviceDetailById);

export default router;
