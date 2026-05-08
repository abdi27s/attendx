import mongoose from "mongoose";

const attendanceSchema = mongoose.create({
  cardno: { type: Number, required: true },
  logDate: { type: Date, required: true },
  logTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  },
  machineSerial: { type: String },
  ipaddress: { type: String, required: true },
  biometric_device_id: { type: Number, required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
