import { z } from "zod";

export const ImageValidation = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size < 2097152, {
      message: "Image should be less than 2mb",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});
