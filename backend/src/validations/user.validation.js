import { z } from "zod";

// enums
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

// HH:mm 24-hour format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// workday schema
const workdaySchema = z
  .object({
    day: dayEnum,
    startTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
    endTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "endTime must be after startTime",
    path: ["endTime"],
  });

// create schema
export const createUserSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  cardno: z
    .number()
    .int("Card number must be integer")
    .positive("Card number must be greater than 0"),

  isAdmin: z.boolean().default(false),

  designation: designationEnum.optional(),

  workdays: z
    .array(workdaySchema)
    .min(1, "At least one workday is required")
    .refine(
      (arr) => {
        const days = arr.map((d) => d.day);
        return new Set(days).size === days.length;
      },
      { message: "Duplicate workdays are not allowed" },
    ),

  active: z.boolean().default(true),
});

// update schema (all optional)
export const updateUserSchema = createUserSchema.partial();
