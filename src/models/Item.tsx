import type { Category } from "./Category";

export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category?: Category
}