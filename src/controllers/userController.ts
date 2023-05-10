import TYPES from "../TYPES";
import container from "../injector";
import { IS3Service } from "../services/s3Service";
import { ok } from "../infra/http/HttpResponse";
import { FileUploadRequest } from "../infra/utils/dto/FileUploadRequest";

export const savePhoto = async (event: any) => {
  if (!event.body) {
    throw new Error("Body not found");
  }
  const request = new FileUploadRequest({ ...event.body });
  const service = container.get<IS3Service>(TYPES.s3Service);
  await service.savePhoto(request);
  return ok();
};

