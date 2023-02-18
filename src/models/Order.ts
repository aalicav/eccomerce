import { isNotUndefined } from "../infra/utils/isNotUndefined";
import { Address } from "../interfaces/Cart/Address";
import { Item } from "../interfaces/Cart/Item";
import { OrderStatus } from "../interfaces/Cart/OrderStatus";
import { PaymentOptions } from "../interfaces/PaymentOptions";

export class Order {
  constructor(payload: Partial<Order>) {
    this.id = isNotUndefined('Parameter id is required', payload.id);
    this.items = payload.items ?? [];
    this.paymentOptions = payload.paymentOptions ?? [];
    this.deliveryAddress = isNotUndefined('Paremeter Address is required', payload.deliveryAddress);
    this.status = isNotUndefined('Paremeter status is required', payload.status);
    this.createdAt = isNotUndefined('Paremeter createdAt is required', payload.createdAt);
  }

  id: string;

  items: Item[];

  paymentOptions: PaymentOptions[];

  deliveryAddress: Address;

  status: OrderStatus;

  createdAt: Date;

}
