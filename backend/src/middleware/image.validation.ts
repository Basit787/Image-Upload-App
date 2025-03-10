import type { Context, Next } from "hono";
import type { z } from "zod";

export const ImageValidationMiddleware = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const formData = await c.req.formData();
      const image = formData.get("image") as File;
      await schema.parse(image);
      return next();
    } catch (error) {
      return c.json({ message: "Failed in validation", error }, 400);
    }
  };
};
