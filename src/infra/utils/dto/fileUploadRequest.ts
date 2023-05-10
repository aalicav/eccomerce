import { isNotUndefined } from "../isNotUndefined";

export class FileUploadRequest {
  constructor(payload: Partial<FileUploadRequest>) {
    this.base64 = isNotUndefined("base64 is required", payload.base64);
    this.name = isNotUndefined("name of file is required", payload.name);
    this.type = isNotUndefined("type of file is required", payload.type);
  }

  base64: string;

  name: string;

  type: string;

  toBuffer() {
    const data = this.base64.split(",");
    return data?.length ? Buffer.from(data.pop() ?? "", "base64") : undefined;
  }
}
