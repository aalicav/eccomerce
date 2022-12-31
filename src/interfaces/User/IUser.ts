import { PaymentOptions } from "../PaymentOptions";
import { TypeUser } from "./TypeUser";

export interface IUser {
  id: string;
  userName: string;
  nickname: string;
  password: string;
  email: string;
  profile: TypeUser;
  active: boolean;
  phone: string;
  updatedAt: string;
  phoneNumberVerified: boolean;
  paymentOptions: PaymentOptions[];
}
