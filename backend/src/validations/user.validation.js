import { z } from "zod";
import { timeToMinutes } from "../utils/DateTime.js";

/* ---------------- ENUMS ---------------- */

const dayEnum = z.enum([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);

const designationEnum = z.enum([
  "manager",
  "cashier",
  "salesperson",
  "accountant",
  "bookkeeping",
  "owner",
  "cleaner",
]);

/* ---------------- TIME VALIDATION ---------------- */

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

/* ---------------- WORKDAY SCHEMA ---------------- */

const workdaySchema = z
  .object({
    day: dayEnum,

    startTime: z.string().regex(timeRegex, "startTime must be in HH:mm format"),

    endTime: z.string().regex(timeRegex, "endTime must be in HH:mm format"),
  })
  .refine((d) => timeToMinutes(d.endTime) > timeToMinutes(d.startTime), {
    message: "endTime must be after startTime",
    path: ["endTime"],
  });

/* ---------------- CREATE USER ---------------- */

export const createUserSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  cardno: z.number().int().positive(),

  isAdmin: z.boolean().default(false),

  designation: designationEnum,

  workdays: z
    .array(workdaySchema)
    .min(1, "At least one workday is required")
    .refine((arr) => new Set(arr.map((d) => d.day)).size === arr.length, {
      message: "Duplicate workdays are not allowed",
    }),

  active: z.boolean().default(true),
});

/* ---------------- UPDATE USER ---------------- */

export const updateUserSchema = createUserSchema.partial();
