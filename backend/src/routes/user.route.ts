import { Hono } from "hono";
import * as user from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const userRoutes = new Hono();

userRoutes.get("/getAllUsers", authMiddleware, user.getAllUsers);
userRoutes.get("/getSingleUser/:id", authMiddleware, user.getSingleUsers);
userRoutes.get("/getUserDetails", authMiddleware, user.getUserDetails);
