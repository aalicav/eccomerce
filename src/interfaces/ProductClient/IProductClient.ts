import { ProductStatus } from "./ProductStatus";

export interface IProductClient {
    id: string,
    name: string,
    productId: string,
    imageUrl: string,
    clientId: string;
    status: ProductStatus;
}