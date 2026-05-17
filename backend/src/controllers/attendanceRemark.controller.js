import AttendanceRemark from "../models/Attendance.Remark.js";

export const getAttendanceRemarks = async (req, res) => {
  try {
    const attendanceRemarks = await AttendanceRemark.find();
    if (attendanceRemarks.length === 0)
      return res.status(400).json({ msg: "No data found" });
    return res.status(200).json(attendanceRemarks);
  } catch (error) {
    console.error("Error in getAttendanceRemarks", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createAttendanceRemark = async (req, res) => {
  const { cardNo, date } = req.body;
  const existingData = await AttendanceRemark.findOne({ cardNo, date });
  if (existingData)
    return res.status(409).json({ msg: "Data already exists." });
  try {
    const attendanceRemark = await AttendanceRemark.create(req.body);
    return res.status(201).json(attendanceRemark);
  } catch (error) {
    console.error("Error in createAttendanceRemark", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateAttendanceRemark = async (req, res) => {
  const existingData = await AttendanceRemark.findById(req.params.id);
  if (!existingData) return res.status(404).json({ msg: "Data not found." });
  try {
    const attendanceRemark = await AttendanceRemark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );
    return res.status(200).json(attendanceRemark);
  } catch (error) {
    console.error("Error in updateAttendanceRemark", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAttendanceRemarkById = async (req, res) => {
  try {
    const attendanceRemark = await AttendanceRemark.findById(req.params.id);
    if (!attendanceRemark)
      return res.status(404).json({ msg: "Data not found." });
    return res.status(200).json(attendanceRemark);
  } catch (error) {
    console.error("Error in getAttendanceRemarkById", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteAttendanceRemark = async (req, res) => {
  try {
    const attendanceRemark = await AttendanceRemark.findByIdAndDelete(
      req.params.id,
    );
    if (!attendanceRemark)
      return res.status(404).json({ msg: "Data not found." });
    return res.status(200).json({ msg: "Data deleted." });
  } catch (error) {
    console.error("Error in deleteAttendanceRemark", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
