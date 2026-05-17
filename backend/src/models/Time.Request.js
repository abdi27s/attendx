import mongoose from "mongoose";

const timeRequestSchema = mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    cardNo: { type: Number, required: true, index: true },
    timestamp: {
      date: {
        type: String,
        required: true,
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
    reason: { type: String, required: true },
    requestedBy: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedOn: { type: Date },
    remarks: { type: String },
    approvedBy: { type: String },
  },
  { timestamps: true },
);

const TimeRequest = mongoose.model("TimeRequest", timeRequestSchema);

export default TimeRequest;
