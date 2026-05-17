import z from "zod";

export const createDeviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  ipaddress: z.string().ipv4("IP Address is required"),
  deviceType: z.string().min(1, "Device Type is required"),
  devicePort: z.number().min(4, "Device Port is required"),
  deviceId: z.number().min(1, "Device Id is required"),
  company: z.string().min(1, "Company is required"),
  devicePassword: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  serverMacAddress: z.string().min(1, "Server Mac Address is required"),
  active: z.boolean().default(true),
});

export const updateDeviceSchema = createDeviceSchema.partial();
