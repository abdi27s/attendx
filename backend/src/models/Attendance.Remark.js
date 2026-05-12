import mongoose from "mongoose";

const attendanceRemarkSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true },
    cardNo: { type: Number, required: true },
    date: {
      type: Date,
      required: true,
    },
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

attendanceRemarkSchema.index({ cardNo: 1, date: 1 }, { unique: true });

const AttendanceRemark = mongoose.model(
  "AttendanceRemark",
  attendanceRemarkSchema,
);

export default AttendanceRemark;
