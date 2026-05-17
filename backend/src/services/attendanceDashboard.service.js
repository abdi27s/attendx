import Attendance from "../models/Attendance.js";

export const getAttendanceDashboardService = async (filters = {}) => {
  const timezone = process.env.TIMEZONE || "Asia/Kathmandu";

  const { cardno, startDate, endDate } = filters;
  const matchStage = {
    ...(cardno && { cardno }),

    ...(startDate &&
      endDate && {
        logTimestamp: {
          $gte: new Date(startDate),
          $lt: new Date(
            new Date(endDate).setDate(new Date(endDate).getDate() + 1),
          ),
        },
      }),
  };

  return Attendance.aggregate([
    /**
     * 1. Filter device logs
     */
    {
      $match: matchStage,
    },

    /**
     * 2. Convert to Nepal date (grouping key)
     */
    {
      $addFields: {
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$logTimestamp",
            timezone,
          },
        },
      },
    },

    /**
     * 3. Group device logs per employee/day
     */
    {
      $group: {
        _id: {
          cardno: "$cardno",
          date: "$date",
        },
        deviceLogs: {
          $push: "$logTimestamp",
        },
      },
    },

    /**
     * 4. Lookup approved TimeRequests
     */
    {
      $lookup: {
        from: "timerequests",
        let: {
          cardno: "$_id.cardno",
          date: "$_id.date",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$cardNo", "$$cardno"] },
                  { $eq: ["$status", "approved"] },
                ],
              },
            },
          },
          {
            $addFields: {
              reqDate: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp",
                  timezone,
                },
              },
            },
          },
          {
            $match: {
              $expr: {
                $eq: ["$reqDate", "$$date"],
              },
            },
          },
        ],
        as: "requests",
      },
    },

    /**
     * 5. Extract request timestamps
     */
    {
      $addFields: {
        requestLogs: {
          $map: {
            input: "$requests",
            as: "r",
            in: "$$r.timestamp",
          },
        },
      },
    },

    /**
     * 6. Merge device + request logs (priority handled here)
     */
    {
      $addFields: {
        allLogs: {
          $concatArrays: ["$deviceLogs", "$requestLogs"],
        },
      },
    },

    /**
     * 7. Sort timeline
     */
    {
      $addFields: {
        allLogs: {
          $sortArray: {
            input: "$allLogs",
            sortBy: 1,
          },
        },
      },
    },

    /**
     * 8. Infer checkin/checkout
     */
    {
      $addFields: {
        checkin: { $arrayElemAt: ["$allLogs", 0] },
        checkout: {
          $cond: [
            { $gt: [{ $size: "$allLogs" }, 1] },
            { $arrayElemAt: ["$allLogs", -1] },
            null,
          ],
        },
      },
    },

    /**
     * 9. Calculate worked minutes
     */
    {
      $addFields: {
        workedMinutes: {
          $cond: [
            { $and: ["$checkin", "$checkout"] },
            {
              $floor: {
                $divide: [{ $subtract: ["$checkout", "$checkin"] }, 1000 * 60],
              },
            },
            0,
          ],
        },
      },
    },

    /**
     * 10. Final output shape
     */
    {
      $project: {
        _id: 0,
        cardno: "$_id.cardno",
        date: "$_id.date",
        checkin: 1,
        checkout: 1,
        workedMinutes: 1,
        totalPunches: { $size: "$allLogs" },
        hasTimeRequest: { $gt: [{ $size: "$requests" }, 0] },
        source: {
          $cond: [{ $gt: [{ $size: "$requests" }, 0] }, "mixed", "device"],
        },
      },
    },

    /**
     * 11. Sort for table view
     */
    {
      $sort: {
        date: -1,
      },
    },
  ]);
};
