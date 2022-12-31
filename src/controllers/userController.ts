import TYPES from "../TYPES";
import container from "../injector";
import { IUserService } from "../services/userService";
import { ok } from "../infra/http/HttpResponse";
import { CreateUser } from "../dto/User/CreateUser.dto";
import { UpdateUserRequest } from "../dto/User/UpdateUserRequest.dto";

export const saveUser = async (event: any) => {
  if (!event.body) {
    throw new Error("Body not found");
  }
  const request = new CreateUser({ ...event.body });
  const service = container.get<IUserService>(TYPES.userService);
  await service.saveUser(request);
  return ok();
};

export const getUser = async (event: any) => {
  if (!event.path.id) {
    throw new Error("user id not found");
  }
  const service = container.get<IUserService>(TYPES.userService);
  const user = await service.getUser(event.path.id);
  return user;
};

export const deleteUser = async (event: any) => {
  if (!event.path.id) {
    throw new Error("user id not found");
  }
  const service = container.get<IUserService>(TYPES.userService);
  await service.deleteUser(event.path.id);
  return ok();
};

export const listUsers = async () => {
  const service = container.get<IUserService>(TYPES.userService);
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
