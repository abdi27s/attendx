import ZKLib from "node-zklib";
import Attendance from "../models/Attendance.js";
import LastSync from "../models/Last.Sync.js";
import DeviceSetup from "./../models/Device.Setup.js";

async function connectDevice() {
  const devices = await DeviceSetup.find(
    { active: true },
    { ipaddress: 1, devicePort: 1 },
  ).lean();
  console.log(devices);
  for (const device of devices) {
    const ip = device.ipaddress;
    const port = device.devicePort;
    const zk = new ZKLib(ip, port, 5200, 5000);

    try {
      await zk.createSocket();
      const logs = await zk.getAttendances();
      console.log("Total logs:", logs.data.length);
      const lastCheck = await LastSync.findOne({ ipaddress: ip });
      const lastSyncTime = lastCheck?.lastSyncedAt || new Date(0);
      const newLogs = logs.data.filter((r) => {
        return new Date(r.recordTime) > lastSyncTime;
      });
      console.log("New logs:", newLogs.length);

      if (newLogs.length > 0) {
        const operations = newLogs.map((record) => {
          const date = new Date(record.recordTime);

          return {
            updateOne: {
              filter: {
                cardno: Number(record.deviceUserId),
                logTimestamp: date,
              },

              update: {
                $setOnInsert: {
                  cardno: Number(record.deviceUserId),
                  logTimestamp: date,
                  machineSerial: "",
                  ipaddress: record.ip,
                  biometric_device_id: 1,
                },
              },
              upsert: true,
            },
          };
        });

        await Attendance.bulkWrite(operations);

        // update last synced time properly
        const latestTime = newLogs.reduce((max, r) => {
          const t = new Date(r.recordTime);
          return t > max ? t : max;
        }, lastSyncTime);

        await LastSync.findOneAndUpdate(
          { ipaddress: ip },
          { $set: { lastSyncedAt: latestTime } },
          { upsert: true },
        );

        console.log("Attendance synced successfully for device:", ip);
      }

      await zk.disconnect();
      console.log("Disconnected");
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
}

export default connectDevice;
