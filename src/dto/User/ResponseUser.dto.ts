import { isNotUndefined } from "../../infra/utils/isNotUndefined";
import { PaymentOptions } from "../../interfaces/PaymentOptions";
import { TypeUser } from "../../interfaces/User/TypeUser";

export class ResponseUser {
  constructor(payload: Partial<ResponseUser>) {
    this.id = isNotUndefined("id is required", payload.id);
    this.email = isNotUndefined("email is required", payload.email);
    this.profile = isNotUndefined("profile is required", payload.profile);
    this.phone = isNotUndefined("phone number is required", payload.phone);
    this.name = isNotUndefined("userName is required", payload.name);
    this.nickname = isNotUndefined("nickname is required", payload.nickname);
    this.phoneNumberVerified = payload.phoneNumberVerified ?? false;
    this.paymentOptions = payload.paymentOptions;
    this.emailVerified = payload.emailVerified ?? false;
  }
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  nickname: string;
  phone: string;
  userName: string;
  active: boolean;
  MFAactive: boolean;
  profile: TypeUser;
  paymentOptions?: PaymentOptions[];

  static fromCognito(userType: any): ResponseUser {
    const attributes = userType.UserAttributes
      ? userType.UserAttributes
      : userType.Attributes;
    return new ResponseUser({
      id: attributes?.find((x: { Name: string }) => x.Name === "sub")?.Value,
      email: attributes?.find((x: { Name: string }) => x.Name === "email")
        ?.Value,
      name: attributes?.find((x: { Name: string }) => x.Name === "name")?.Value,
      nickname: attributes?.find((x: { Name: string }) => x.Name === "nickname")
        ?.Value,
      emailVerified:
        attributes?.find((x: { Name: string }) => x.Name === "email_verified")
          ?.Value === "true",
      active: userType.Enabled,
      profile: attributes?.find((x: { Name: string }) => x.Name === "profile")
        ?.Value as TypeUser,
      paymentOptions: JSON.parse(
        attributes?.find(
          (x: { Name: string }) => x.Name === "custom:payment_options"
        )?.Value ?? "[]"
      ),
      phone: attributes?.find(
        (x: { Name: string }) => x.Name === "phone_number"
      )?.Value,
      phoneNumberVerified:
        attributes?.find(
          (x: { Name: string }) => x.Name === "phone_number_verified"
        )?.Value === "true",
    });
  }
}
