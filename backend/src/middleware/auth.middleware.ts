import type { Context, Next } from "hono";
import { auth } from "../lib/auth.js";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      return c.json({ message: "Login to continue..." }, 400);
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  } catch (error) {
    return c.json({ message: "failed in authentication", error }, 500);
  }
};
