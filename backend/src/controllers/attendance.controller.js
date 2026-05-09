import Attendance from "../models/Attendance.js";

export const getAttendances = async (req, res) => {
  const attendances = await Attendance.find();
  return res.status(200).json(attendances);
};
