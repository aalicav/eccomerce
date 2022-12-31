const TYPES = {
  DynamoDBClient: Symbol.for("DynamoDBClient"),
  userRepository: Symbol.for("userRepository"),
  userService: Symbol.for("userService"),
  productService: Symbol.for("productService"),
  productRepository: Symbol.for("productRepository"),
  CognitoIdentityProvider: Symbol.for("CognitoIdentityProvider"),
  SNSClient: Symbol.for("SNSClient"),
  S3Client: Symbol.for("S3Client"),
};

export default TYPES;
