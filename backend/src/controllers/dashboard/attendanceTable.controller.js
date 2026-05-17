import { getAttendanceDashboardService } from "../../services/attendanceDashboard.service.js";

export const getAttendanceTable = async (req, res) => {
  const filters = {
    cardno: req.query.cardno ? Number(req.query.cardno) : undefined,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };
  const data = await getAttendanceDashboardService(filters);
  console.log("data", data);
  if (data.length === 0) return res.status(400).json({ msg: "No data found" });
  return res.status(200).json(data);
};
