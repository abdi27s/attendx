import mongoose from "mongoose";

const timeRequestSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    cardNo: { type: Number, required: true, index: true },
    timestamp: {
      type: Date,
      required: true,
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
