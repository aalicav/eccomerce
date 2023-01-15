import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./TYPES";
import { IUserRepository } from "./infra/persistence/IUserRepository";
import { userRepository } from "./infra/persistence/repositories/userRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IUserService, UserService } from "./services/userService";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { SNSClient } from "@aws-sdk/client-sns";
import { IProductService, ProductService } from "./services/productService";
import { IProductRepository } from "./infra/persistence/IProductRepository";
import { productRepository } from "./infra/persistence/repositories/productRepository";
import { S3Client } from "@aws-sdk/client-s3";
import { uploadFunctions } from "./infra/utils/uploadFunctions";

const container = new Container();

const dynamoDB = new DynamoDBClient({ region: process.env.REGION });
const snsClient = new SNSClient({ region: process.env.REGION });
const s3Client = new S3Client({ region: process.env.REGION });
const cognitoIdentityProvider = new CognitoIdentityProvider({
  region: process.env.REGION,
});
const uploadFunction = new uploadFunctions(s3Client);

container.bind<SNSClient>(TYPES.SNSClient).toConstantValue(snsClient);
container.bind<S3Client>(TYPES.S3Client).toConstantValue(s3Client);
container.bind<uploadFunctions>(TYPES.uploadFunctions).toConstantValue(uploadFunction);
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(dynamoDB);
container
  .bind<CognitoIdentityProvider>(TYPES.CognitoIdentityProvider)
  .toConstantValue(cognitoIdentityProvider);

container.bind<IUserRepository>(TYPES.userRepository).to(userRepository);
container
  .bind<IProductRepository>(TYPES.productRepository)
  .to(productRepository);
container.bind<IUserService>(TYPES.userService).to(UserService);
container.bind<IProductService>(TYPES.productService).to(ProductService);

export default container;
