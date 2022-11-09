import { faker } from "@faker-js/faker"
import { BaseModel } from "./BaseModel.model"


export interface Product extends BaseModel{
    productId: number | string,
    title: string,
    image: string,
    description: string,
    price: number,
    isNew: boolean,
    tags?: string[],
    stock: number,
}

export interface CreateProduct extends Omit<Product, 'productId' | 'createdAt' | 'updatedAt'> {

}

//-----//-----//-----//-- SERVICIOS --//-----//-----//-----//-----//----
export const products: Product[] = []

export const createProduct = (data: CreateProduct): Product => {
    const newProduct = {
        ...data,
        productId: faker.database.mongodbObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return newProduct
}
