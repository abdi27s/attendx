import express from "express";
import {
    createDevice,
    getDeviceDetails,
    updateDevice,
} from "../controllers/deviceSetup.controller.js";

const router = express.Router();

router.get("/", getDeviceDetails);
router.post("/", createDevice);
router.put("/:id", updateDevice);

export default router;
