import type { Category } from "./Category";

export interface ShopItem {
    id: number,
    price: number,
    name: string,
    description?: string,
    category?: Category[],
    features: string[],
    imageName: string,
    maxQuantity: number,
    quantityPercentDelimeter: number,
    isNew: boolean,
    isHot: boolean,
}