import ZKLib from "node-zklib";

import Attendance from "../models/Attendance.js";
import LastAttendanceCheck from "../models/Last.Attendance.Check.js";

async function connectDevice() {
  const ip = process.env.DEVICE_IP;
  const port = Number(process.env.DEVICE_PORT || 4370);

  const zk = new ZKLib(ip, port, 5200, 5000);

  try {
    await zk.createSocket();

    const logs = await zk.getAttendances();

    console.log("Total logs:", logs.data.length);

    // get last sync
    const lastCheck = await LastAttendanceCheck.findOne({ ipaddress: ip });

    const lastSyncTime = lastCheck?.lastSyncedAt || new Date(0);

    // filter only new logs
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
              deviceTimestamp: date,
            },

            update: {
              $setOnInsert: {
                cardno: Number(record.deviceUserId),
                deviceTimestamp: date,
                logDate: date.toISOString().split("T")[0],
                logTime: date.toTimeString().split(" ")[0],
                machineSerial: "ZKTeco",
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

      await LastAttendanceCheck.findOneAndUpdate(
        { ipaddress: ip },
        { $set: { lastSyncedAt: latestTime } },
        { upsert: true },
      );

      console.log("Attendance synced ✔");
    }

    await zk.disconnect();
    console.log("Disconnected ✔");
  } catch (err) {
    console.error("FULL ERROR:", err);
  }
}

export default connectDevice;
