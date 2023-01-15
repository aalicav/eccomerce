import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { inject, injectable } from "inversify";
import TYPES from "../../TYPES";
import { FileUploadRequest } from "./dto/FileUploadRequest";

@injectable()
export class uploadFunctions {
  constructor(@inject(TYPES.S3Client) private s3Client: S3Client) {}
  async uploadPhoto({
    bucketArn,
    file,
    path,
  }: {
    bucketArn: string;
    file: FileUploadRequest;
    path: string;
  }) {
    const params: PutObjectCommandInput = {
      Bucket: bucketArn,
      Key: `${path}#${file.name}`,
      Body: file.toBuffer(),
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);

    await this.s3Client.send(command, (output) => {
      output;
    });
  }
}
