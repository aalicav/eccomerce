import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";
import { isNotUndefined } from "../../infra/utils/isNotUndefined";
import { PaymentOptions } from "../../interfaces/PaymentOptions";
import { TypeUser } from "../../interfaces/User/TypeUser";

export class CreateUser {
  constructor(payload: Partial<CreateUser>) {
    this.email = isNotUndefined("email is required", payload.email);
    this.profile = isNotUndefined("password is required", payload.profile);
    this.password = isNotUndefined("type is required", payload.password);
    this.phone = isNotUndefined("phone number is required", payload.phone);
    this.name = isNotUndefined("userName is required", payload.name);
    this.userName = isNotUndefined("userName is required", payload.userName);
    this.nickname = isNotUndefined("nickname is required", payload.nickname);
    this.paymentOptions = payload.paymentOptions;
  }
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  userName: string;
  profile: TypeUser;
  paymentOptions?: PaymentOptions[];

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
        Name: "custom:payment_options",
        Value: JSON.stringify(this.paymentOptions),
      },
    ];
  }
}
