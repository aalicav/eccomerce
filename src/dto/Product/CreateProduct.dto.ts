import { isNotUndefined } from "../../infra/utils/isNotUndefined";
import { v4 as generateUUID } from "uuid";

export class CreateProduct {
  constructor(payload: Partial<CreateProduct>) {
    this.id = generateUUID();
    this.stock = isNotUndefined("phone number is required", payload.stock);
    this.name = isNotUndefined("userName is required", payload.name);
    this.imageUrl = isNotUndefined("userName is required", payload.imageUrl);
    this.description = isNotUndefined(
      "description is required",
      payload.description
    );
    this.price = isNotUndefined("status is required", payload.price);
  }
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}
