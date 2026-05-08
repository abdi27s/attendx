import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/db.js";
import connectDevice from "./configs/zkteco.js";
import { adminOnly } from "./middlewares/adminOnly.js";
import { protect } from "./middlewares/auth.js";
import authRouter from "./routes/auth/auth.route.js";
import deviceSetup from "./routes/deviceSetup.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", protect, userRouter);
app.use("/api/device", protect, adminOnly, deviceSetup);

connectDB();
// connectDevice();
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
