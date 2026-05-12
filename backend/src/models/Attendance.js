import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  cardno: {
    type: Number,
    required: true,
    index: true,
  },

  logTimestamp: {
    type: Date,
    required: true,
    index: true,
  },

  machineSerial: { type: String },
  ipaddress: { type: String, required: true },
  biometric_device_id: { type: Number, required: true },
});

// prevent duplicates
attendanceSchema.index({ cardno: 1, logTimestamp: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
