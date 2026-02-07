import type { ShopItem } from "./ShopItem";

export interface TombolaItem {
    shopItem?: ShopItem;
    weight: number;
    isPenalty?: boolean;
    penaltyText?: string;
}

export interface TombolaReward {
    item: TombolaItem;
    timestamp: Date;
}

export type TombolaTier = 1 | 2 | 3;
