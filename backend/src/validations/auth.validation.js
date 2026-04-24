import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password should be at least 5 characters long"),
});
