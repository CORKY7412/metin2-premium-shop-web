import type { ShopItem } from '../models/ShopItem';
import type { Category } from '../models/Category';
import type { CartItem } from '../models/Cart';
import type { TombolaItem, TombolaTier } from '../models/TombolaItem';
import type { PurchaseResponse, SpinResponse, UserBalance } from './api';
import { mockShopItems } from '../testing/ShopItemMocking';
import {
  tombolaTier1Items,
  tombolaTier2Items,
  tombolaTier3Items,
} from '../testing/TombolaItemMocking';
import {
  HIGHLIGHTS_CATEGORY,
  VEREDELN_CATEGORY,
  KOSMETIK_CATEGORY,
  CHARACTER_CATEGORY,
  METINPLUS_CATEGORY,
  REDUZIERT_CATEGORY,
  OFFERS_CATEGORY,
  PAKETE_CATEGORY,
  VEREDELUNGSSTEINE_CATEGORY,
  SEGENSSCHRIFTROLLEN_CATEGORY,
  KOSTUEME_CATEGORY,
} from '../testing/CategoryModelMocking';
import { generateRewards } from '../utils/rewardsService';

const mockCategories: Category[] = [
  HIGHLIGHTS_CATEGORY,
  VEREDELN_CATEGORY,
  KOSMETIK_CATEGORY,
  CHARACTER_CATEGORY,
  METINPLUS_CATEGORY,
  REDUZIERT_CATEGORY,
  OFFERS_CATEGORY,
  PAKETE_CATEGORY,
  VEREDELUNGSSTEINE_CATEGORY,
  SEGENSSCHRIFTROLLEN_CATEGORY,
  KOSTUEME_CATEGORY,
];

// Mutable mock user state (simulates DB)
const mockUser = {
  drBalance: 500,
  tombolaTickets: 3,
  yabbieCoins: 0,
};

let purchaseCounter = 1;

function weightedRandom<T extends { weight: number }>(items: T[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of items) {
    rand -= item.weight;
    if (rand <= 0) return item;
  }
  return items[items.length - 1];
}

const delay = (ms = 200) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const mockApi = {
  shop: {
    getItems: async (categoryId?: number): Promise<ShopItem[]> => {
      await delay();
      if (!categoryId) return mockShopItems;
      // Include items from direct match and subcategories
      const matchingIds = new Set<number>([categoryId]);
      for (const cat of mockCategories) {
        if (cat.parentCategory?.id === categoryId) matchingIds.add(cat.id);
      }
      return mockShopItems.filter(item => item.category && matchingIds.has(item.category.id));
    },
  },

  categories: {
    getAll: async (): Promise<Category[]> => {
      await delay();
      return mockCategories;
    },
  },

  purchase: async (_userId: string, items: CartItem[]): Promise<PurchaseResponse> => {
    await delay(500);
    const rewards = generateRewards(items);
    const totalYabbieCoins = rewards
      .filter(r => r.type === 'yabbie_coins')
      .reduce((sum, r) => sum + (r.amount ?? 0), 0);
    mockUser.yabbieCoins += totalYabbieCoins;
    rewards
      .filter(r => r.type === 'tombola_ticket')
      .forEach(r => { mockUser.tombolaTickets += r.amount ?? 0; });
    return {
      purchaseId: purchaseCounter++,
      purchasedItems: items,
      rewards,
      totalYabbieCoins,
    };
  },

  user: {
    getBalance: async (_userId: string): Promise<UserBalance> => {
      await delay();
      return { ...mockUser };
    },
  },

  tombola: {
    getItems: async (tier: TombolaTier): Promise<TombolaItem[]> => {
      await delay();
      const tierMap: Record<TombolaTier, TombolaItem[]> = {
        1: tombolaTier1Items,
        2: tombolaTier2Items,
        3: tombolaTier3Items,
      };
      return tierMap[tier];
    },

    spin: async (tier: TombolaTier, _userId: string): Promise<SpinResponse> => {
      await delay(500);
      if (mockUser.tombolaTickets <= 0) {
        throw new Error('Keine Tombola-Tickets mehr vorhanden');
      }
      mockUser.tombolaTickets--;
      const tierMap: Record<TombolaTier, TombolaItem[]> = {
        1: tombolaTier1Items,
        2: tombolaTier2Items,
        3: tombolaTier3Items,
      };
      const item = weightedRandom(tierMap[tier]);
      return {
        item,
        timestamp: new Date().toISOString(),
        newTicketCount: mockUser.tombolaTickets,
      };
    },
  },
};
