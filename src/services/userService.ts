import { inject, injectable } from "inversify";
import { CreateUser } from "../dto/User/CreateUser.dto";
import { ResponseUser } from "../dto/User/ResponseUser.dto";
import { UpdateUserRequest } from "../dto/User/UpdateUserRequest.dto";
import { IUserRepository } from "../infra/persistence/IUserRepository";
import TYPES from "../TYPES";

export interface IUserService {
  saveUser(request: CreateUser): Promise<void>;
  getUser(id: string): Promise<ResponseUser>;
  deleteUser(id: string): Promise<void>;
  list(): Promise<ResponseUser[]>;
  updateUser(request: UpdateUserRequest): Promise<void>;
}
@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.userRepository) private userRepository: IUserRepository
  ) {}

  async updateUser(request: UpdateUserRequest) {
    await this.userRepository.updateUser(request);
  }

  async saveUser(request: CreateUser): Promise<void> {
    await this.userRepository.saveUser(request);
  }
  async getUser(id: string): Promise<ResponseUser> {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async list(): Promise<ResponseUser[]> {
    const response = this.userRepository.list();
    return response;
  }
}
