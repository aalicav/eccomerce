import { IProduct } from "../interfaces/Product/Product";

export class Product implements IProduct {
  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    imageUrl: string,
    categoryId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
  }
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
}
