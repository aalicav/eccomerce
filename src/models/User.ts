import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";
import { FileUploadRequest } from "../infra/utils/dto/FileUploadRequest";
import { isNotUndefined } from "../infra/utils/isNotUndefined";
import { PaymentOptions } from "../interfaces/PaymentOptions";
import { TypeUser } from "../interfaces/User/TypeUser";

export class CreateUser {
  constructor(payload: Partial<CreateUser>) {
    this.email = isNotUndefined("email is required", payload.email);
    this.profile = isNotUndefined("profile is required", payload.profile);
    this.password = isNotUndefined("type is required", payload.password);
    this.phone = isNotUndefined("phone number is required", payload.phone);
    this.name = isNotUndefined("userName is required", payload.name);
    this.userName = isNotUndefined("userName is required", payload.userName);
    this.nickname = isNotUndefined("nickname is required", payload.nickname);
    this.paymentOptions = payload.paymentOptions;
    this.base64photo = payload.base64photo;
  }
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  userName: string;
  profile: TypeUser;
  paymentOptions?: PaymentOptions[];
  base64photo?: FileUploadRequest;

  toUserAttributes(): Array<AttributeType> {
    return [
      {
        Name: "email",
        Value: this.email,
      },
      {
        Name: "name",
        Value: this.name,
      },
      {
        Name: "phone_number",
        Value: this.phone,
      },
      {
        Name: "profile",
        Value: this.profile,
      },
      {
        Name: "birthdate",
        Value: "1672339280",
      },
      {
        Name: "updated_at",
        Value: "1672339280",
      },
      {
        Name: "address",
        Value: this.profile,
      },
      {
        Name: "nickname",
        Value: this.nickname,
      },
      {
        Name: "custom:photo_url",
        Value: this.base64photo
          ? `https://prof-images.s3.amazonaws.com/${this.base64photo?.name}`
          : `https://prof-images.s3.amazonaws.com/default.jpg`,
      },
      {
        Name: "custom:payment_options",
        Value: JSON.stringify(this.paymentOptions),
      },
    ];
  }
}
