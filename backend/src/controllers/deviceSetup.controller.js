import DeviceSetup from "../models/Device.Setup.js";
import {
  createDeviceSchema,
  updateDeviceSchema,
} from "../validations/deviceSetup.validation.js";
export const getDeviceDetails = async (req, res) => {
  try {
    const deviceDetail = await DeviceSetup.find();
    return res.status(300).json(deviceDetail);
  } catch (error) {
    console.error("Error in getDeviceSetup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createDevice = async (req, res) => {
  const parsedData = createDeviceSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
  }
  try {
    const { ipaddress } = parsedData.data;
    const existingDevice = await DeviceSetup.findOne({ ipaddress });
    console.log(existingDevice);
    if (existingDevice) {
      return res.status(409).json({ message: "Device already exists" });
    }
    const device = await DeviceSetup.create(parsedData.data);
    return res.status(201).json(device);
  } catch (error) {
    console.error("Error in createDevice", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDevice = async (req, res) => {
  const parsedData = updateDeviceSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
  }
  try {
    const device = await DeviceSetup.findByIdAndUpdate(
      req.params.id,
      parsedData.data,
      {
        returnDocument: "after",
      },
    );
    return res.status(200).json(device);
  } catch (error) {
    console.error("Error in updateDevice", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeviceDetailById = async (req, res) => {
  try {
    const device = await DeviceSetup.findById(req.params.id);
    return res.status(200).json(device);
  } catch (error) {
    console.error("Error in getDeviceDetailById", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
