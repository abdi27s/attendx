import TimeRequest from "../models/Time.Request.js";

export const getTimeRequests = async (req, res) => {
  try {
    const timeRequests = await TimeRequest.find();
    if (timeRequests.length === 0)
      return res.status(400).json({ msg: "No data found" });
    return res.status(200).json(timeRequests);
  } catch (error) {
    console.error("Error in getTimeRequests", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createTimeRequest = async (req, res) => {
  try {
    const { cardNo, timestamp } = req.body;
    const existing = await TimeRequest.findOne({
      cardNo,
      "timestamp.date": timestamp.date,
    });

    if (existing) {
      return res.status(400).json({
        msg: "Time request already exists for this date.",
      });
    }

    const timeRequest = await TimeRequest.create(req.body);
    return res.status(201).json(timeRequest);
  } catch (error) {
    console.error("Error in createTimeRequest", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getTimeRequestById = async (req, res) => {
  try {
    const timeRequest = await TimeRequest.findById(req.params.id);
    if (!timeRequest) return res.status(404).json({ msg: "Data not found." });
    return res.status(200).json(timeRequest);
  } catch (error) {
    console.error("Error in getTimeRequestById", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateTimeRequest = async (req, res) => {
  try {
    const timeRequest = await TimeRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );
    if (!timeRequest) return res.status(404).json({ msg: "Data not found." });
    return res.status(200).json(timeRequest);
  } catch (error) {
    console.error("Error in updateTimeRequest", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteTimeRequest = async (req, res) => {
  try {
    const deleted = await TimeRequest.findOneAndDelete({
      _id: req.params.id,
      status: "pending",
    });
    if (!deleted) {
      return res.status(400).json({
        msg: "Only pending requests can be deleted or data not found.",
      });
    }
    return res.status(200).json({ msg: "Data deleted." });
  } catch (error) {
    console.error("Error in deleteTimeRequest", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
