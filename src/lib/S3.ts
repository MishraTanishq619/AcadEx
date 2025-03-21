import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

interface UploadFileToS3Params {
  file: Buffer | Uint8Array | Blob | string;
  bucketName: string;
  key: string;
}

export const uploadFileToS3 = async ({ file, bucketName, key }: UploadFileToS3Params): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
    return data;
  } catch (error) {
    console.error(`Error uploading file: ${error.message}`);
    throw error;
  }
};