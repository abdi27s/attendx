import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/db.js";
import connectDevice from "./configs/zkteco.js";
import { adminOnly } from "./middlewares/adminOnly.js";
import { protect } from "./middlewares/auth.js";
import attendance from "./routes/attendance.route.js";
import attendanceRemark from "./routes/attendanceRemark.route.js";
import authRouter from "./routes/auth/auth.route.js";
import dashboard from "./routes/dashboard/attendanceTable.route.js";
import deviceSetup from "./routes/deviceSetup.route.js";
import lastSync from "./routes/lastSync.route.js";
import timeRequest from "./routes/timeRequest.route.js";
import userRouter from "./routes/user.route.js";
import { seedUsers } from "./seeds/user.seed.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    await seedUsers();

    app.listen(port, () => {
      console.log(`server started on ${port}`);
    });

    // connectDevice(); // optional after server start
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", protect, adminOnly, userRouter);
app.use("/api/device", protect, adminOnly, deviceSetup);
app.use("/api/attendance", protect, adminOnly, attendance);
app.use("/api/last-sync", protect, lastSync);
app.use("/api/attendance-remarks", protect, attendanceRemark);
app.use("/api/time-request", protect, timeRequest);
app.use("/api/dashboard", protect, dashboard);

startServer();
