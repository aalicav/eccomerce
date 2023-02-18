
export class UpdateProductRequest {
  constructor(payload: Partial<UpdateProductRequest>) {
    this.description = payload.description;
    this.price = payload.price;
    this.categoryId = payload.categoryId;
    this.stock = payload.stock;
    this.name = payload.name;
    this.imageUrl = payload.imageUrl;
  }
  name?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}
