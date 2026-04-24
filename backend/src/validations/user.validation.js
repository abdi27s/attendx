import { z } from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5, "Password should be at least 5 characters long"),
  cardno: z.number().gt(0, "Cardno should be greater than 0"),
  role: z.enum(["admin", "user"]).default("user"),
  designation: z
    .enum([
      "manager",
      "cashier",
      "Salesperson",
      "accountant",
      "bookkeeping",
      "owner",
      "cleaner",
    ])
    .optional(),
});

export const updateSchema = createUserSchema;
