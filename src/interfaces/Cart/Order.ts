import { PaymentOptions } from "../PaymentOptions";
import { IUser } from "../User/IUser";
import { Address } from "./Address";
import { Item } from "./Item";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  id: string;
  customer: IUser;
  items: Item[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentOptions;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
