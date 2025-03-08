import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

const { AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

//s3 client
export const s3 = new S3Client({
  region: AWS_REGION!,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
});

//save image in s3
export const s3SaveImage = async ({
  Key,
  Body,
}: {
  Key: string;
  Body: Buffer;
}) => {
  try {
    const uploadImage = new PutObjectCommand({
      Bucket: AWS_BUCKET!,
      Key,
      Body,
      ContentType: "multipart/form-data",
    });
    await s3.send(uploadImage);
  } catch (error) {
    throw new Error("Failed while saving image", error as Error);
  }
};

//get image in s3
export const s3GetImage = async (Key: string) => {
  try {
    const command = new GetObjectCommand({ Bucket: AWS_BUCKET!, Key });
    return await getSignedUrl(s3, command, { expiresIn: 900 });
  } catch (error) {
    throw new Error("Failed while fetching image", error as Error);
  }
};

//delete image in s3
export const s3DeleteImage = async (Key: string) => {
  try {
    const command = new DeleteObjectCommand({ Bucket: AWS_BUCKET!, Key });
    return await s3.send(command);
  } catch (error) {
    throw new Error("Failed while deleting image", error as Error);
  }
};
