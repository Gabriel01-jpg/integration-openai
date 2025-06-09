import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3ClientService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  async saveFileToS3(
    bucketName: string,
    fileName: string,
    fileContent: Buffer,
  ): Promise<string> {
    try {
      const params = {
        Bucket: bucketName,
        Key: fileName, // Append timestamp to avoid overwriting
        Body: fileContent,
      };

      const response = await this.s3Client.send(new PutObjectCommand(params));

      if (response.$metadata.httpStatusCode !== 200) {
        throw new Error('Failed to upload file to S3');
      }

      return `${process.env.S3_ENDPOINT}/${fileName}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }
}
