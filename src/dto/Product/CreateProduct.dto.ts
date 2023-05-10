import { isNotUndefined } from "../../infra/utils/isNotUndefined";
import { v4 as generateUUID } from "uuid";

export class CreateProduct {
  constructor(payload: Partial<CreateProduct>) {
    this.id = generateUUID();
    this.stock = isNotUndefined("stock is required", payload.stock);
    this.name = isNotUndefined("name is required", payload.name);
    this.imageUrl = payload.imageUrl;
    this.description = isNotUndefined(
      "description is required",
      payload.description
    );
    this.price = isNotUndefined("status is required", payload.price);
    this.categoryId = isNotUndefined("status is required", payload.categoryId);
    }
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}
