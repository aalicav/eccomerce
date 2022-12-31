import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { inject, injectable } from "inversify";
import TYPES from "../../TYPES";

@injectable()
export class uploadFunctions {
  constructor(@inject(TYPES.S3Client) private s3Client: S3Client) {}
  async uploadPhoto({
    bucketArn,
    file,
    path,
  }: {
    bucketArn: string;
    file: any;
    path: string;
  }) {
    const params: PutObjectCommandInput = {
      Bucket: bucketArn,
      Key: `${path}#${file.name}`,
      Body: file.toBuffer(),
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);

    await this.s3Client.send(command);
  }
}
