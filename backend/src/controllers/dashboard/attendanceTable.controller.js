import { getAttendanceDashboardService } from "../../services/attendanceDashboard.service.js";

export const getAttendanceTable = async (req, res) => {
  const data = await getAttendanceDashboardService();
  if (data.length === 0) return res.status(400).json({ msg: "No data found" });
  return res.status(200).json(data);
};
