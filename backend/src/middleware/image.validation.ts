import type { Context, Next } from "hono";
import type { z } from "zod";

export const ImageValidationMiddleware = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const image = await c.req.parseBody();
      await schema.parse(image);
      return next();
    } catch (error) {
      return c.json({ message: "Failed in validation", error }, 400);
    }
  };
};
