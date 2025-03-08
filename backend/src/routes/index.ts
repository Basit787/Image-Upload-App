import { Hono } from "hono";
import { userRoutes } from "./user.route.js";
import { auth } from "../lib/auth.js";
import { imageRoute } from "./image.route.js";

export const indexRoutes = new Hono();

indexRoutes.route("/users", userRoutes);
indexRoutes.route("/image", imageRoute);

indexRoutes.post("/auth/**", (c) => auth.handler(c.req.raw));
