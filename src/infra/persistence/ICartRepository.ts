import { Address } from "../../interfaces/Cart/Address";
import { Item } from "../../interfaces/Cart/Item";
import { Cart } from "../../models/Cart";
import { Order } from "../../models/Order";

export interface ICartRepository {
  create(
    items: Item[],
    shippingAddress: Address,
    billingAddress: Address
  ): Promise<Cart>;
  addItem(cartId: string, item: Item): Promise<void>;
  removeItem(cartId: string, itemId: string): Promise<void>;
  updateItemQuantity(
    cartId: string,
    itemId: string,
    newQuantity: number
  ): Promise<void>;
  get(cartId: string): Promise<Cart>;
  checkout(cartId: string): Promise<Order>;
}
