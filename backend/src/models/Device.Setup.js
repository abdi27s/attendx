import mongoose from "mongoose";

const deviceSetupSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ipaddress: { type: String, required: true, unique: true },
    deviceType: { type: String, required: true },
    devicePort: { type: Number, required: true },
    deviceId: { type: Number, required: true, unique: true },
    company: { type: String, required: true },
    devicePassword: { type: String, default: "0" },
    username: { type: String },
    password: { type: String },
    serverMacAddress: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);
const DeviceSetup = mongoose.model("DeviceSetup", deviceSetupSchema);

export default DeviceSetup;
