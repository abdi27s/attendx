import express from "express";
import {
    createAttendanceRemark,
    deleteAttendanceRemark,
    getAttendanceRemarkById,
    getAttendanceRemarks,
    updateAttendanceRemark,
} from "../controllers/attendanceRemark.controller.js";

const router = express.Router();

router.get("/", getAttendanceRemarks);
router.get("/:id", getAttendanceRemarkById);
router.post("/", createAttendanceRemark);
router.put("/:id", updateAttendanceRemark);
router.delete("/:id", deleteAttendanceRemark);

export default router;
