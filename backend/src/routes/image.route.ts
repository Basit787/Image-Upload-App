import { Hono } from "hono";
import * as image from "../controller/imageUpload.controller.js";
import { ImageValidationMiddleware } from "../middleware/image.validation.js";
import { ImageValidation } from "../zod/image.validation.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const imageRoute = new Hono();

imageRoute.post(
  "/uploadImage",
  //   authMiddleware,
  ImageValidationMiddleware(ImageValidation),
  image.imageUpload
);
imageRoute.get("/getAllImages", image.getAllImages);
imageRoute.get("/getSingleImage/:id", image.getSingleImage);
imageRoute.delete("/deleteImage/:id", image.deleteImage);
