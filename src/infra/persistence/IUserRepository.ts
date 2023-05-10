import { CreateUser } from "../../dto/User/CreateUser.dto";
import { ResponseUser } from "../../dto/User/ResponseUser.dto";
import { UpdateUserRequest } from "../../dto/User/UpdateUserRequest.dto";

export interface IUserRepository {
  saveUser(body: CreateUser): Promise<void>;

  getUser(id: string): Promise<ResponseUser | undefined>;

  deleteUser(id: string): Promise<void>;

  updateUser(request: UpdateUserRequest): Promise<void>;

  list(): Promise<ResponseUser[]>;
}
