import express from "express";
import LastAttendanceCheck from "../models/Last.Attendance.Check.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const lastSync = await LastAttendanceCheck.find();
  console.log(lastSync);
  const syncDate = lastSync[0].lastSyncedAt.toISOString().split("T")[0];
  return res.status(200).json(syncDate);
});

export default router;
