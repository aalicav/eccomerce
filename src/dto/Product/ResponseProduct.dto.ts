import { isNotUndefined } from "../../infra/utils/isNotUndefined";

export class ResponseProduct {
  constructor(payload: Partial<ResponseProduct>) {
    this.id = isNotUndefined("id is required", payload.id);
    this.name = isNotUndefined("name is required", payload.name);
    this.imageUrl = isNotUndefined("userName is required", payload.imageUrl);
    this.categoryId = isNotUndefined(
      "categoryId is required",
      payload.categoryId
    );
    this.description = payload.description;
    this.stock = payload.stock ?? 0;
    this.price = payload.price ?? 0;
  }
  id: string;
  name: string;
  categoryId: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
}
