import { isNotUndefined } from "../infra/utils/isNotUndefined";
import { Address } from "../interfaces/Cart/Address";
import { Item } from "../interfaces/Cart/Item";

export class Cart {
  constructor(payload: Partial<Cart>) {
    this.id = isNotUndefined("id is required", payload.id);
    this.items = isNotUndefined("items are required", payload.items);
    this.shippingAddress = payload.shippingAddress;
    this.billingAddress = payload.billingAddress;
    this.userId = isNotUndefined("userId is required", payload.userId);
    this.subTotal = payload.subTotal;
    this.total = payload.total;
  }
  id: string;
  items: Item[];
  shippingAddress?: Address;
  billingAddress?: Address;
  userId: string;
  subTotal?: number;
  total?: number;

  addItem(item: Item): void {
    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.subTotal = this.items.reduce(
      (subTotal, item) => subTotal + item.price,
      0
    );
    this.total = this.subTotal + (this.shippingAddress?.shippingPrice ?? 0);
  }

  updateItem(itemId: string, quantity: number): void {
    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    this.items[itemIndex]!.quantity = quantity;
    this.calculateTotal();
  }

  updateShippingAddress(address: Address): void {
    this.shippingAddress = address;
    this.calculateTotal();
  }

  updateBillingAddress(address: Address): void {
    this.billingAddress = address;
  }
}
