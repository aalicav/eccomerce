import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";
import { isNotUndefined } from "../../infra/utils/isNotUndefined";
import { PaymentOptions } from "../../interfaces/PaymentOptions";
import { TypeUser } from "../../interfaces/User/TypeUser";

export class UpdateUserRequest {
  constructor(payload: Partial<UpdateUserRequest>) {
    this.id = isNotUndefined("id is required", payload.id);
    this.email = payload.email;
    this.profile = payload.profile;
    this.phone = payload.phone;
    this.name = payload.name;
    this.userName = payload.userName;
    this.nickname = payload.nickname;
    this.paymentOptions = payload.paymentOptions;
  }
  id: string;
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  userName?: string;
  profile?: TypeUser;
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
