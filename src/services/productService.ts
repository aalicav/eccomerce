import { inject, injectable } from "inversify";
import { CreateProduct } from "../dto/Product/CreateProduct.dto";
import { ResponseProduct } from "../dto/Product/ResponseProduct.dto";
import { UpdateUserRequest } from "../dto/User/UpdateUserRequest.dto";
import { IProductRepository } from "../infra/persistence/IProductRepository";
import TYPES from "../TYPES";

export interface IProductService {
  saveProduct(request: CreateProduct): Promise<void>;
  getProduct(id: string): Promise<ResponseProduct>;
  deleteProduct(id: string): Promise<void>;
  list(): Promise<ResponseProduct[]>;
  updateProduct(request: UpdateUserRequest): Promise<void>;
}
@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.productRepository)
    private productRepository: IProductRepository
  ) {}
  async getProduct(id: string): Promise<ResponseProduct> {
    const product = await this.productRepository.getProduct(id);

    if (!product) throw new Error("product not found");

    return product;
  }
  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
  async list(): Promise<ResponseProduct[]> {
    const products = await this.productRepository.list();
    return products;
  }
  updateProduct(_request: UpdateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async saveProduct(request: CreateProduct): Promise<void> {
    await this.productRepository.saveProduct(request);
  }
}
