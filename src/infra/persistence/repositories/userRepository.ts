import { IUserRepository } from "../IUserRepository";
import { inject, injectable } from "inversify";
import TYPES from "../../../TYPES";

import { CreateUser } from "../../../dto/User/CreateUser.dto";
import {
  AdminDeleteUserCommand,
  AdminDeleteUserCommandInput,
  AdminGetUserCommand,
  AdminGetUserCommandInput,
  AdminUpdateUserAttributesCommand,
  AdminUpdateUserAttributesCommandInput,
  CognitoIdentityProvider,
  ListUsersCommand,
  ListUsersCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { ResponseUser } from "../../../dto/User/ResponseUser.dto";
import { UpdateUserRequest } from "../../../dto/User/UpdateUserRequest.dto";

@injectable()
export class userRepository implements IUserRepository {
  constructor(
    @inject(TYPES.CognitoIdentityProvider)
    private cognitoIdentityProvider: CognitoIdentityProvider
  ) {}
  async getUser(id: string): Promise<ResponseUser | undefined> {
    const params: AdminGetUserCommandInput = {
      Username: id,
      UserPoolId: process.env.COGNITO_USER_POOL,
    };
    const command = new AdminGetUserCommand(params);
    const result = await this.cognitoIdentityProvider.send(command);
    return ResponseUser.fromCognito(result);
  }

  async deleteUser(id: string): Promise<void> {
    const params: AdminDeleteUserCommandInput = {
      Username: id,
      UserPoolId: process.env.COGNITO_USER_POOL,
    };
    const command = new AdminDeleteUserCommand(params);
    await this.cognitoIdentityProvider.send(command);
  }

  async list(): Promise<ResponseUser[]> {
    const params: ListUsersCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL,
    };
    const command = new ListUsersCommand(params);

    const users = await this.cognitoIdentityProvider.send(command);

    return users.Users?.map((x) => ResponseUser.fromCognito(x)) ?? [];
  }

  async saveUser(body: CreateUser): Promise<void> {
    const UserAttributes = body.toUserAttributes();
    const params: SignUpCommandInput = {
      Username: body.email,
      Password: body.password,
      ClientId: process.env.COGNITO_CLIENT_ID,
      UserAttributes,
    };
    const command = new SignUpCommand(params);

    await this.cognitoIdentityProvider.send(command);
  }

  async updateUser(request: UpdateUserRequest): Promise<void> {
    const params: AdminUpdateUserAttributesCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL,
      Username: request.id,
      UserAttributes: request.toUserAttributes(),
    };

    const command = new AdminUpdateUserAttributesCommand(params);

    this.cognitoIdentityProvider.send(command);
  }
}
