//Convert "HH:mm" → total minutes
export const timeToMinutes = (time) => {
  if (!time || typeof time !== "string") return 0;

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

//Convert total minutes → "HH:mm"
export const minutesToTime = (minutes) => {
  if (typeof minutes !== "number") return "00:00";

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/**
 * Normalize workdays (API → DB format)
 * Converts startTime/endTime → startMinutes/endMinutes
 */
export const normalizeWorkdays = (workdays = []) => {
  return workdays.map((w) => ({
    day: w.day,
    startMinutes: timeToMinutes(w.startTime),
    endMinutes: timeToMinutes(w.endTime),
  }));
};

/**
 * Get current Nepal time (optional but useful for attendance)
 */
export const getNepalNow = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
  });
};

/**
 * Convert JS Date → minutes of day (Nepal time)
 * Useful for attendance check-in comparison
 */
export const dateToNepalMinutes = (date = new Date()) => {
  const nepalTime = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }),
  );

  return nepalTime.getHours() * 60 + nepalTime.getMinutes();
};

export const formatDateField = (field, format) => ({
  $dateToString: {
    format,
    date: { $toDate: `$${field}` },
    timezone: process.env.TIMEZONE || "+05:45",
  },
});
