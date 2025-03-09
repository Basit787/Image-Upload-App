import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { indexRoutes } from "./routes/index.js";

const app = new Hono();

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api", indexRoutes);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT),
});
