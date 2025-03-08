import { z } from "zod";

export const UserValdation = z.object({
  name: z.string().min(1, { message: "Min 1 char is required" }),
  age: z.number(),
  password: z.string().min(8, { message: "Min 8 digits password required" }),
  email: z.string().email({ message: "Email must be in proper format" }),
  role: z.enum(["user", "admin"]).default("user"),
});
