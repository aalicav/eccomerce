import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { injectable, inject } from "inversify";
import { Address } from "../../../interfaces/Cart/Address";
import { Item } from "../../../interfaces/Cart/Item";
import { Cart } from "../../../models/Cart";
import TYPES from "../../../TYPES";
import { ICartRepository } from "../ICartRepository";
import { v4 as uuid } from "uuid";
import { Order } from "../../../models/Order";
@injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @inject(TYPES.DynamoDBClient)
    private dynamoDb: DynamoDBClient
  ) {}
  async create(
    items: Item[],
    shippingAddress: Address,
    billingAddress: Address
  ): Promise<Cart> {
    const cartId = uuid();
    const cart = new Cart({
      id: cartId,
      items,
      shippingAddress,
      billingAddress,
    });
    const params: PutItemCommandInput = {
      TableName: process.env.CARTS_TABLE,
      Item: marshall(cart),
    };
    const command = new PutItemCommand(params);
    await this.dynamoDb.send(command);
    return cart;
  }
  async addItem(cartId: string, item: Item): Promise<void> {
    const params: UpdateItemCommandInput = {
      TableName: process.env.CARTS_TABLE,
      Key: marshall({ id: cartId }),
      UpdateExpression: "set items = list_append(items, :item)",
      ExpressionAttributeValues: marshall({
        ":item": [item],
      }),
      ReturnValues: "UPDATED_NEW",
    };
    const command = new UpdateItemCommand(params);
    await this.dynamoDb.send(command);
  }
  async removeItem(cartId: string, itemId: string): Promise<void> {
    const params: UpdateItemCommandInput = {
      TableName: process.env.CARTS_TABLE,
      Key: marshall({ id: cartId }),
      UpdateExpression: "set items = :items",
      ExpressionAttributeValues: marshall({
        ":items": {
          items: {
            action: "remove",
            value: [{ id: { S: itemId } }],
          },
        },
      }),
      ReturnValues: "UPDATED_NEW",
    };
    const command = new UpdateItemCommand(params);
    await this.dynamoDb.send(command);
  }
  async updateItemQuantity(
    cartId: string,
    itemId: string,
    newQuantity: number
  ): Promise<void> {
    const params: UpdateItemCommandInput = {
      TableName: process.env.CARTS_TABLE,
      Key: marshall({ id: cartId }),
      UpdateExpression: "set items[].quantity = :quantity",
      ConditionExpression: "items[].id = :itemId",
      ExpressionAttributeValues: marshall({
        ":quantity": newQuantity,
        ":itemId": itemId,
      }),
      ReturnValues: "UPDATED_NEW",
    };
    const command = new UpdateItemCommand(params);
    await this.dynamoDb.send(command);
  }
  async get(cartId: string): Promise<Cart> {
    const params: GetItemCommandInput = {
      TableName: process.env.CARTS_TABLE,
      Key: marshall({ id: cartId }),
    };
    const command = new GetItemCommand(params);
    const response = await this.dynamoDb.send(command);
    const item = response.Item;
    if (!item) {
      throw new Error(`Cart with id ${cartId} not found`);
    }
    return unmarshall(item) as Cart;
  }

  async checkout(cartId: string): Promise<Order> {
    const cart = await this.get(cartId);
    const order = new Order(cart);
    const params: PutItemCommandInput = {
      TableName: process.env.ORDERS_TABLE,
      Item: marshall(order),
    };
    const command = new PutItemCommand(params);
    await this.dynamoDb.send(command);
    return order;
  }
}
