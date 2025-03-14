import type { Context } from "hono";
import { s3DeleteImage, s3GetImage, s3SaveImage } from "../lib/s3.js";
import { createKey, getMb } from "../helpers/utils.js";
import { db } from "../db/index.js";
import { imageTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

//upload image
export const imageUpload = async (c: Context) => {
  const user = c.get("user");

  try {
    const data = await c.req.formData();
    const file = data.get("image") as File;
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
      201,
    );
  } catch (error) {
    return c.json(
      {
        message: "Failed to upload the image",
        error: error instanceof Error ? error.message : error,
      },
      500,
    );
  }
};

//get all images
export const getAllImages = async (c: Context) => {
  const user = c.get("user");
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
    return c.json(
      {
        message: "upload image failed",
        error: error instanceof Error ? error.message : error,
      },
      500,
    );
  }
};

//delete image
export const deleteImage = async (c: Context) => {
  const id = c.req.param("id");
  console.log(id);
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

    await s3DeleteImage(result[0].key);

    return c.json(
      { message: "Image deleted sucessfully", result: deleteData },
      200,
    );
  } catch (error) {
    return c.json(
      {
        message: "Failed to delete image",
        error: error instanceof Error ? error.message : error,
      },
      500,
    );
  }
};

export const deleteAllImages = async (c: Context) => {
  const user = c.get("user");

  try {
    const images = await db
      .select()
      .from(imageTable)
      .where(eq(imageTable.userId, user.id));

    if (!images.length) {
      return c.json({ message: "No images found for the user" }, 404);
    }

    const deleteData = await db
      .delete(imageTable)
      .where(eq(imageTable.userId, user.id));

    const s3DeletePromises = images.map((image) => s3DeleteImage(image.key));
    await Promise.all(s3DeletePromises);

    return c.json(
      {
        message: "All images deleted successfully",
        count: deleteData.length,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        message: "Failed to delete images",
        error: error instanceof Error ? error.message : error,
      },
      500,
    );
  }
};
