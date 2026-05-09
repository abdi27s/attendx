import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  cardno: {
    type: Number,
    required: true,
    index: true,
  },

  // raw device timestamp (source of truth)
  deviceTimestamp: {
    type: Date,
    required: true,
    index: true,
  },

  logDate: {
    type: String,
    required: true,
  },

  logTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  },

  machineSerial: String,
  ipaddress: { type: String, required: true },
  biometric_device_id: { type: Number, required: true },
});

// prevent duplicates
attendanceSchema.index({ cardno: 1, deviceTimestamp: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
