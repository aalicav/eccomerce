import TYPES from "../TYPES";
import container from "../injector";
import { internalServerError, ok } from "../infra/http/HttpResponse";
import { UpdateUserRequest } from "../dto/User/UpdateUserRequest.dto";
import { CreateProduct } from "../dto/Product/CreateProduct.dto";
import { IProductService, ProductService } from "../services/productService";
import Log from "@dazn/lambda-powertools-logger";

export const saveProduct = async (event: any) => {
  try {
    if (!event.body) {
      throw new Error("Body not found");
    }
    const request = new CreateProduct({ ...event.body });
    const service = container.get<IProductService>(TYPES.productService);
    await service.saveProduct(request);
    return ok();
  } catch (e: any) {
    Log.error(e.message);
    return internalServerError("Internal error");
  }
};

export const getProduct = async (event: any) => {
  try {
    if (!event.path.id) {
      throw new Error("user id not found");
    }
    const service = container.get<IProductService>(TYPES.productService);
    const user = await service.getProduct(event.path.id);
    return user;
  } catch (e: any) {
    Log.error(e.message);
    return internalServerError("Internal error");
  }
};

export const deleteProduct = async (event: any) => {
  try {
    if (!event.path.id) {
      throw new Error("user id not found");
    }
    const service = container.get<IProductService>(TYPES.productService);
    await service.deleteProduct(event.path.id);
    return ok();
  } catch (e: any) {
    Log.error(e.message);
    return internalServerError("Internal error");
  }
};

export const listProducts = async () => {
  try {
    const service = container.get<ProductService>(TYPES.productService);
    const user = await service.list();
    return ok(user);
  } catch (e: any) {
    Log.error(e.message);
    return internalServerError("Internal error");
  }
};

export const updateUser = async (event: any) => {
  try {
    if (!event.path.id) {
      throw new Error("user id not found");
    }
    const service = container.get<ProductService>(TYPES.productService);

    const request = new UpdateUserRequest({ id: event.path.id, ...event.body });
    await service.updateProduct(request);
    return ok();
  } catch (e: any) {
    Log.error(e.message);
    return internalServerError("Internal error");
  }
};
