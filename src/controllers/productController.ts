import TYPES from "../TYPES";
import container from "../injector";
import { IUserService } from "../services/userService";
import { ok } from "../infra/http/HttpResponse";
import { UpdateUserRequest } from "../dto/User/UpdateUserRequest.dto";
import { CreateProduct } from "../dto/Product/CreateProduct.dto";
import { IProductService, ProductService } from "../services/productService";

export const saveProduct = async (event: any) => {
  if (!event.body) {
    throw new Error("Body not found");
  }
  const request = new CreateProduct({ ...event.body });
  const service = container.get<IProductService>(TYPES.productService);
  await service.saveProduct(request);
  return ok();
};

export const getProduct = async (event: any) => {
  if (!event.path.id) {
    throw new Error("user id not found");
  }
  const service = container.get<IProductService>(TYPES.productService);
  const user = await service.getProduct(event.path.id);
  return user;
};

export const deleteProduct = async (event: any) => {
  if (!event.path.id) {
    throw new Error("user id not found");
  }
  const service = container.get<IProductService>(TYPES.productService);
  await service.deleteProduct(event.path.id);
  return ok();
};

export const listProducts = async () => {
  const service = container.get<ProductService>(TYPES.productService);
  const user = await service.list();
  return user;
};

export const updateUser = async (event: any) => {
  if (!event.path.id) {
    throw new Error("user id not found");
  }
  const service = container.get<IUserService>(TYPES.userService);

  const request = new UpdateUserRequest({ id: event.path.id, ...event.body });
  await service.updateUser(request);
  return ok();
};
