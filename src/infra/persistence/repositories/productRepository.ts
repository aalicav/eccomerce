import { inject, injectable } from "inversify";
import TYPES from "../../../TYPES";

import { UpdateUserRequest } from "../../../dto/User/UpdateUserRequest.dto";
import { IProductRepository } from "../IProductRepository";
import { CreateProduct } from "../../../dto/Product/CreateProduct.dto";
import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { marshallOptions } from "@aws-sdk/util-dynamodb/dist-types/marshall";
import { ResponseProduct } from "../../../dto/Product/ResponseProduct.dto";

@injectable()
export class productRepository implements IProductRepository {
  constructor(
    @inject(TYPES.DynamoDBClient)
    private dynamoDb: DynamoDBClient
  ) {}
  async getProduct(id: string): Promise<ResponseProduct | undefined> {
    const params: GetItemCommandInput = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: marshall({ id }),
    };

    const command = new GetItemCommand(params);

    const response = await this.dynamoDb.send(command);

    const product = response.Item ? unmarshall(response.Item) : {};
    return new ResponseProduct(product);
  }
  async deleteProduct(id: string): Promise<void> {
    const params: DeleteItemCommandInput = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: marshall({ id }),
    };

    const command = new DeleteItemCommand(params);

    await this.dynamoDb.send(command);
  }
  updateProduct(_request: UpdateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<ResponseProduct[]> {
    const params: ScanInput = {
      TableName: process.env.PRODUCTS_TABLE,
    };

    const command = new ScanCommand(params);
    const response = await this.dynamoDb.send(command);

    const products = response.Items
      ? response.Items.map((x) => unmarshall(x))
      : [];

    return products.map((x) => new ResponseProduct(x));
  }
  async saveProduct(body: CreateProduct): Promise<void> {
    const marshallOptions: marshallOptions = {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    };

    const params: PutItemCommandInput = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: marshall(body, marshallOptions),
    };
    const command = new PutItemCommand(params);

    await this.dynamoDb.send(command);
  }
}
