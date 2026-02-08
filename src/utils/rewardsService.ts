import type { PurchaseReward, CartItem } from "../models/Cart";
import { mockShopItems } from "../testing/ShopItemMocking";

const REWARD_TIERS = {
  LOW: { minPrice: 0, maxPrice: 20, ticket: 0.08, drVoucher: 0.05, bonusItem: 0.05 },
  MEDIUM: { minPrice: 20, maxPrice: 50, ticket: 0.10, drVoucher: 0.10, bonusItem: 0.08 },
  HIGH: { minPrice: 50, maxPrice: 100, ticket: 0.12, drVoucher: 0.15, bonusItem: 0.12 },
  PREMIUM: { minPrice: 100, maxPrice: Infinity, ticket: 0.15, drVoucher: 0.20, bonusItem: 0.15 },
} as const;

const DR_AMOUNTS = {
  CHEAP: [10, 25],
  MEDIUM: [25, 50],
  EXPENSIVE: [50, 100],
} as const;

const YABBIE_COINS_RATE = 0.1;

const getTierChances = (price: number) => {
  if (price < REWARD_TIERS.MEDIUM.minPrice) return REWARD_TIERS.LOW;
  if (price < REWARD_TIERS.HIGH.minPrice) return REWARD_TIERS.MEDIUM;
  if (price < REWARD_TIERS.PREMIUM.minPrice) return REWARD_TIERS.HIGH;
  return REWARD_TIERS.PREMIUM;
};

const getDRAmount = (price: number): number => {
  const amounts = price < 30
    ? DR_AMOUNTS.CHEAP
    : price < 80
      ? DR_AMOUNTS.MEDIUM
      : DR_AMOUNTS.EXPENSIVE;

  return amounts[Math.floor(Math.random() * amounts.length)];
};

const getRandomBonusItem = (price: number) => {
  let filteredItems;

  if (price < 30) {
    filteredItems = mockShopItems.filter(item => item.price <= 50);
  } if (price < 80) {
    filteredItems = mockShopItems.filter(item => item.price > 20 && item.price <= 100);
  } else {
    filteredItems = mockShopItems.filter(item => item.price > 50);
  }

  return filteredItems[Math.floor(Math.random() * filteredItems.length)] || mockShopItems[0];
};

export const generateRewards = (items: CartItem[]): PurchaseReward[] => {
  let totalCoins = 0;
  let tombolaTickets = 0;
  const drVouchers: { [key: number]: number } = {};
  const bonusItemCoins: { item: string; coins: number }[] = [];

  items.forEach(item => {

    const itemPrice = item.shopItem.price;
    const chances = getTierChances(itemPrice);

    for (let i = 0; i < item.quantity; i++) {

      const coins = Math.max(1, Math.ceil(itemPrice * YABBIE_COINS_RATE));
      totalCoins += coins;

      const random = Math.random();
      let cumulativeChance = 0;

      cumulativeChance += chances.ticket;
      if (random < cumulativeChance) {
        tombolaTickets++;
        continue;
      }

      cumulativeChance += chances.drVoucher;
      if (random < cumulativeChance) {
        const drAmount = getDRAmount(itemPrice);
        drVouchers[drAmount] = (drVouchers[drAmount] || 0) + 1;
        continue;
      }

      cumulativeChance += chances.bonusItem;
      if (random < cumulativeChance) {
        const randomItem = getRandomBonusItem(itemPrice);
        const bonusCoins = Math.max(1, Math.ceil(randomItem.price * YABBIE_COINS_RATE));
        totalCoins += bonusCoins;
        bonusItemCoins.push({
          item: randomItem.name,
          coins: bonusCoins,
        });
      }
    }
  });

  const rewards: PurchaseReward[] = [];

  if (tombolaTickets > 0) {
    rewards.push({
      type: 'tombola_ticket',
      amount: tombolaTickets,
      description: `${tombolaTickets}x Tombola-Ticket${tombolaTickets > 1 ? 's' : ''}`,
    });
  }

  Object.entries(drVouchers).forEach(([amount, count]) => {
    rewards.push({
      type: 'dr_voucher',
      amount: Number(amount) * count,
      description: `${count}x ${amount} DR Gutschein${count > 1 ? 'e' : ''}`,
    });
  });

  bonusItemCoins.forEach(bonus => {
    const bonusItem = mockShopItems.find(item => item.name === bonus.item);
    rewards.push({
      type: 'yabbie_coins',
      amount: bonus.coins,
      description: `Bonus: ${bonus.item} (${bonus.coins} Yabbie-Münzen)`,
      item: bonusItem,
    });
  });

  rewards.push({
    type: 'yabbie_coins',
    amount: totalCoins,
    description: `${totalCoins} Yabbie-Münzen`,
  });

  return rewards;
};
