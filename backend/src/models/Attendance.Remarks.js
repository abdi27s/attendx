import mongoose from "mongoose";

const attendanceRemarksSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true },
    cardNo: { type: Number, required: true },
    date: { type: Date, required: true },
    leaveType: {
      type: String,
      enum: [
        "Sick",
        "Casual",
        "Annual",
        "Maternity",
        "Paternity",
        "Unpaid",
        "Other",
      ],
    },
    remarks: { type: String, required: true },
    submittedBy: { type: String, required: true },
  },
  { timestamps: true },
);
const AttendanceRemarks = mongoose.model(
  "AttendanceRemarks",
  attendanceRemarksSchema,
);

export default AttendanceRemarks;
