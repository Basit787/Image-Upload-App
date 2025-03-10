import { z } from "zod";

export const ImageValidation = z.object({
  name: z.string(),
  type: z.enum(["image/jpeg", "image/jpg", "image/png", "image/webp"]),
  size: z.number().max(5 * 1024 * 1024, "Image should be less than 5MB"),
});
