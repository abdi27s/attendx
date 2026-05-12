import express from "express";
import LastSync from "../models/Last.Sync.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const lastSync = await LastSync.find();
  if (lastSync.length === 0)
    return res.status(404).json({ msg: "No data found" });
  const syncDate = lastSync[0].lastSyncedAt.toISOString().split("T")[0];
  return res.status(200).json(syncDate);
});

export default router;
