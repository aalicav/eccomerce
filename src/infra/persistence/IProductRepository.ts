import { CreateProduct } from "../../dto/Product/CreateProduct.dto";
import { ResponseProduct } from "../../dto/Product/ResponseProduct.dto";
import { UpdateUserRequest } from "../../dto/User/UpdateUserRequest.dto";

export interface IProductRepository {
  saveProduct(body: CreateProduct): Promise<void>;

  getProduct(id: string): Promise<ResponseProduct | undefined>;

  deleteProduct(id: string): Promise<void>;

  updateProduct(request: UpdateUserRequest): Promise<void>;

  list(): Promise<ResponseProduct[]>;
}
