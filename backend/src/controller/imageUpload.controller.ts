import type { Context } from "hono";
import { s3DeleteImage, s3GetImage, s3SaveImage } from "../lib/s3.js";
import { createKey, getMb } from "../helpers/utils.js";
import { db } from "../db/index.js";
import { imageTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

//upload image
export const imageUpload = async (c: Context) => {
  const user = c.get("user");
  console.log("upload", user);

  try {
    const data = await c.req.parseBody();
    const file = data.image as File;
    const buffer = await file.arrayBuffer();

    const param = {
      Key: createKey(file.name),
      Body: Buffer.from(buffer),
    };

    const imageData = {
      key: param.Key,
      size: getMb(file.size),
      type: file.type,
      name: file.name,
      userId: user.id,
    };

    const savedData = await db.insert(imageTable).values(imageData).returning();

    await s3SaveImage(param);

    return c.json(
      { message: "Image uploaded successfully", reult: savedData[0] },
      201
    );
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return c.json(
      {
        message: "upload image failed",
        error: error instanceof Error ? error.message : error,
      },
      500
    );
  }
};

//get all images
export const getAllImages = async (c: Context) => {
  const user = c.get("user");
  console.log("image", user);
  try {
    const result = await db
      .select()
      .from(imageTable)
      .where(eq(imageTable.userId, user.id));

    for (const obj of result) {
      const url = await s3GetImage(obj.key!);
      obj.url = url;
    }

    return c.json({ error: "Images fetched sucessfully", result }, 200);
  } catch (error) {
    return c.json({ message: "upload image failed", error }, 500);
  }
};

//get single image
export const getSingleImage = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db
      .select()
      .from(imageTable)
      .where(eq(imageTable.id, id));

    if (!result.length) return c.json({ error: "Failed to get images" }, 404);

    console.log(result);

    // const url = await s3GetImage(result.key!);
    // result.url = url;

    return c.json({ message: "Images fetched sucessfully", result }, 200);
  } catch (error) {
    return c.json({ message: "upload image failed", error }, 500);
  }
};

//delete image
export const deleteImage = async (c: Context) => {
  const id = c.req.param("id");

  try {
    const result = await db
      .select()
      .from(imageTable)
      .where(eq(imageTable.id, id));

    if (!result.length) return c.json({ error: "Failed to get images" }, 404);

    const deleteData = await db.delete(imageTable).where(eq(imageTable.id, id));
    if (!deleteData) {
      return c.json({ message: "Failed to delete image" }, 400);
    }

    // const sendData = await s3DeleteImage(result.key!);

    // if (!sendData) {
    //   return c.json({ error: "upload image failed" }, 400);
    // }

    return c.json(
      { message: "Images deleted sucessfully", result: deleteData },
      200
    );
  } catch (error) {
    return c.json({ message: "Failed to fetch single image", error }, 500);
  }
};
