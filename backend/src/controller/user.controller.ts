import type { Context } from "hono";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async (c: Context) => {
  try {
    const result = await db.select().from(user);
    return c.json({ message: "Users fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: "Failed to fetch users", error }, 500);
  }
};

export const getSingleUsers = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db.select().from(user).where(eq(user.id, id));
    if (!result.length) return c.json({ message: "User not found" }, 404);
    return c.json(
      { message: "Users fetched successfully", result: result[0] },
      200,
    );
  } catch (error) {
    return c.json({ message: "Failed to fetch users", error }, 500);
  }
};

export const getUserDetails = async (c: Context) => {
  const user = c.get("user");
  try {
    return c.json(
      { message: "User detils fetched successfully", result: user },
      200,
    );
  } catch (error) {
    return c.json({ message: "Failed to fetch users", error }, 500);
  }
};
