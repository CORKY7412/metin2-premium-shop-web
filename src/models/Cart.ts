import type { ShopItem } from "./ShopItem";

export interface CartItem {
    shopItem: ShopItem;
    quantity: number;
    addedAt: Date;
}

export interface PurchaseReward {
    type: 'item' | 'dr_voucher' | 'tombola_ticket' | 'yabbie_coins';
    item?: ShopItem;
    amount?: number;
    description: string;
}

export interface PurchaseResult {
    purchasedItems: CartItem[];
    rewards: PurchaseReward[];
    totalYabbieCoins: number;
}
