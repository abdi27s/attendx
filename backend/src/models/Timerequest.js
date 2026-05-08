import mongoose from "mongoose";

const timeRequestSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true },
    cardNo: { type: Number, required: true },
    date: { type: Date, required: true },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    },
    reason: { type: String, required: true },
    requestedBy: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedOn: { type: Date },
    Remarks: { type: String },
    approvedBy: { type: String },
    attendanceId: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const TimeRequest = mongoose.model("TimeRequest", timeRequestSchema);

export default TimeRequest;
