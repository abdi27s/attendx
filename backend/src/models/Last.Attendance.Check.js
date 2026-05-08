import mongoose from "mongoose";

const lastAttendanceCheckSchema = mongoose.Schema(
  { ipaddress: { type: String, required: true } },
  { timestamps: true },
);

const LastAttendanceCheck = mongoose.model(
  "LastAttendanceCheck",
  lastAttendanceCheckSchema,
);

export default LastAttendanceCheck;
