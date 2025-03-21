'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!,
  },
});

console.log("S3 : ",{
    region: process.env.NEXT_PUBLIC_S3_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!,
      bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME!
    },
  })

export const uploadFileToS3 = async (file: File): Promise<string | null> => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const fileKey = `uploads/${Date.now()}-${file.name}`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${fileKey}`;

    return fileUrl;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    return null;
  }
};
