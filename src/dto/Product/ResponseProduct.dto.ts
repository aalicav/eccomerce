import { isNotUndefined } from "../../infra/utils/isNotUndefined";

export class ResponseProduct {
  constructor(payload: Partial<ResponseProduct>) {
    this.id = isNotUndefined("password is required", payload.id);
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
