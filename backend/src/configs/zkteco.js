import ZKLib from "node-zklib";

async function connectDevice() {
  const ip = process.env.DEVICE_IP;
  const port = Number(process.env.DEVICE_PORT || 4370);

  console.log("ENV CHECK:", { ip, port });

  const zk = new ZKLib(ip, port, 5200, 5000);

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Socket timeout")), ms),
      ),
    ]);
  }

  try {
    console.log("Creating socket...");
    await withTimeout(zk.createSocket(), 8000);
    console.log("Connected ✔");

    console.log("Fetching logs...");
    const logs = await zk.getAttendances();

    console.log("Logs count:", logs?.length);

    await zk.disconnect();
  } catch (err) {
    console.error("FULL ERROR:", err);
  }
}

export default connectDevice;
