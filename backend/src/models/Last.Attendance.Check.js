import mongoose from "mongoose";

const lastAttendanceCheckSchema = new mongoose.Schema({
  ipaddress: { type: String, required: true, unique: true },

  lastSyncedAt: {
    type: Date,
    default: new Date(0),
  },
});

const LastAttendanceCheck = mongoose.model(
  "LastAttendanceCheck",
  lastAttendanceCheckSchema,
);

export default LastAttendanceCheck;
