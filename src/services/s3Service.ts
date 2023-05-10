import { inject, injectable } from "inversify";
import { uploadFunctions } from "../infra/utils/uploadFunctions";
import TYPES from "../TYPES";
import { FileUploadRequest } from "../infra/utils/dto/FileUploadRequest";

export interface IS3Service {
  savePhoto(request: FileUploadRequest): Promise<void>;
}
@injectable()
export class S3Service implements IS3Service {
  constructor(
    @inject(TYPES.uploadFunctions) private uploadServices: uploadFunctions
  ) {}

  async savePhoto(request: FileUploadRequest): Promise<void> {
    if (!process.env.BUCKET_PROFILE_PHOTO) {
      throw new Error("Bucket arn not found");
    }
    if (!request) {
      throw new Error("Parameter buffer64 is required");
    }
    await this.uploadServices.uploadPhoto({
      bucketArn: process.env.BUCKET_PROFILE_PHOTO,
      file: request,
      path: request.name,
    });
  }
}
