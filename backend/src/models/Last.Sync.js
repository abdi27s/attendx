import mongoose from "mongoose";

const lastSyncSchema = new mongoose.Schema({
  ipaddress: { type: String, required: true, unique: true },

  lastSyncedAt: {
    type: Date,
    default: new Date(0),
  },
});

const LastSync = mongoose.model("LastSync", lastSyncSchema);

export default LastSync;
