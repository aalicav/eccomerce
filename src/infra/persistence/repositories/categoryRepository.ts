import { inject, injectable } from "inversify";
import TYPES from "../../../TYPES";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DeleteItemCommandInput,
  GetItemCommandInput,
  PutItemCommandInput,
  ScanInput,
  GetItemCommand,
  DeleteItemCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { ICategoryRepository } from "../ICategoryRepository";
import { GetCategoryResponse } from "../../../dto/Category/GetCategoryResponse.dto";
import { UpdateProductRequest } from "../../../dto/Product/UpdateProductRequest.dto";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @inject(TYPES.DynamoDBClient)
    private dynamoDb: DynamoDBClient
  ) {}
  async updateCategory(
    id: string,
    request: UpdateProductRequest
  ): Promise<void> {
    const params: UpdateItemCommandInput = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: marshall({ id }),
      UpdateExpression:
        "set #n = :name, #d = :description, set #p = :price, set #s = :stock, set #i = :imageUrl",
      ExpressionAttributeNames: {
        "#n": "name",
        "#d": "description",
        "#p": "price",
        "#s": "stock",
        "#i": "imageUrl",
      },
      ExpressionAttributeValues: marshall({
        ":name": request.name,
        ":description": request.description,
        price: request.price,
        stock: request.stock,
        imageUrl: request.imageUrl,
      }),
      ReturnValues: "UPDATED_NEW",
    };
    const command = new UpdateItemCommand(params);
    await this.dynamoDb.send(command);
  }
  async saveCategory(category: ICategory): Promise<void> {
    const params: PutItemCommandInput = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: marshall(category),
    };
    const command = new PutItemCommand(params);
    await this.dynamoDb.send(command);
  }

  async getCategory(id: string): Promise<ICategory | undefined> {
    const params: GetItemCommandInput = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: marshall({ id }),
    };
    const command = new GetItemCommand(params);
    const response = await this.dynamoDb.send(command);
    return response.Item
      ? new GetCategoryResponse(unmarshall(response.Item))
      : undefined;
  }

  async deleteCategory(id: string): Promise<void> {
    const params: DeleteItemCommandInput = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: marshall({ id }),
    };
    const command = new DeleteItemCommand(params);
    await this.dynamoDb.send(command);
  }

  async listCategories(): Promise<ICategory[]> {
    const params: ScanInput = {
      TableName: process.env.CATEGORIES_TABLE,
    };
    const command = new ScanCommand(params);
    const response = await this.dynamoDb.send(command);
    const categories = response.Items
      ? response.Items.map((x) => new GetCategoryResponse(unmarshall(x)))
      : [];
    return categories;
  }
}
