import express from "express";
import { getAttendanceTable } from "../controllers/dashboard/attendanceTable.controller.js";

const router = express.Router();

router.get("/", getAttendanceTable);

export default router;
