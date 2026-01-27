import type { Category } from "./Category";
import type { Item } from "./Item";

export interface ShopItem {
    id: number,
    item: Item
    price: number,
    description: string,
    category?: Category,
    features: string[],
    imageName: string,
    canBuymultipleQuantity: boolean
}