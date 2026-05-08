import DeviceSetup from "../models/Device.Setup.js";
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
  try {
    const device = await DeviceSetup.create(req.body);
    return res.status(201).json(device);
  } catch (error) {
    console.error("Error in createDevice", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const device = await DeviceSetup.findByIdAndUpdate(
      req.params.id,
      req.body,
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
