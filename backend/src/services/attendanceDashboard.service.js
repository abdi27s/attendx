import Attendance from "../models/Attendance.js";

export const getAttendanceDashboardService = async () => {
  return Attendance.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "cardno",
        foreignField: "cardno",
        as: "user",
      },
    },
  ]);
};
