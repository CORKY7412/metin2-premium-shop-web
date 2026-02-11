import type { ShopItem } from '../models/ShopItem';
import type { Category } from '../models/Category';
import type { CartItem, PurchaseReward } from '../models/Cart';
import type { TombolaItem, TombolaTier } from '../models/TombolaItem';
import { mockApi } from './mockApi';

export const CURRENT_USER = 'testuser';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? 'API-Fehler');
  return json.data as T;
}

export interface PurchaseResponse {
  purchaseId: number;
  purchasedItems: CartItem[];
  rewards: PurchaseReward[];
  totalYabbieCoins: number;
}

export interface SpinResponse {
  item: TombolaItem;
  timestamp: string;
  newTicketCount: number;
}

export interface UserBalance {
  drBalance: number;
  tombolaTickets: number;
  yabbieCoins: number;
}

const realApi = {
  shop: {
    getItems: (categoryId?: number): Promise<ShopItem[]> => {
      const url = categoryId ? `/shop/items?categoryId=${categoryId}` : '/shop/items';
      return request<ShopItem[]>(url);
    },
  },

  categories: {
    getAll: (): Promise<Category[]> => request<Category[]>('/categories'),
  },

  purchase: (userId: string, items: CartItem[]): Promise<PurchaseResponse> =>
    request<PurchaseResponse>('/purchase', {
      method: 'POST',
      body: JSON.stringify({ userId, items }),
    }),

  user: {
    getBalance: async (userId: string): Promise<UserBalance> => {
      const [tickets, coins, dr] = await Promise.all([
        request<{ tombolaTickets: number }>(`/user/${userId}/tombola-tickets`),
        request<{ yabbieCoins: number }>(`/user/${userId}/yabbie-coins`),
        request<{ drBalance: number }>(`/user/${userId}/dr-balance`),
      ]);
      return { drBalance: dr.drBalance, tombolaTickets: tickets.tombolaTickets, yabbieCoins: coins.yabbieCoins };
    },
  },

  tombola: {
    getItems: (tier: TombolaTier): Promise<TombolaItem[]> =>
      request<TombolaItem[]>(`/tombola/items/${tier}`),

    spin: (tier: TombolaTier, userId: string): Promise<SpinResponse> =>
      request<SpinResponse>('/tombola/spin', {
        method: 'POST',
        body: JSON.stringify({ tier, userId }),
      }),
  },
};

export const api = import.meta.env.VITE_USE_MOCK === 'true' ? mockApi : realApi;
