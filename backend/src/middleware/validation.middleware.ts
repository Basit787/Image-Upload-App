import type { Context, Next } from "hono";
import type { z } from "zod";

export const ValidationMiddleware = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    const userData = await c.req.json();
    try {
      await schema.parse(userData);
      return next();
    } catch (error) {
      return c.json({ message: "Error in validation", error }, 400);
    }
  };
};
