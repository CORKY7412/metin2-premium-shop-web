import type { TombolaItem } from "../../../../models/TombolaItem";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/**
 * Selects a random item from the tombola based on weighted probabilities.
 * Items with higher weights have a greater chance of being selected.
 *
 * @param items - Array of tombola items with weights
 * @returns The randomly selected item
 */
export const selectRandomItem = (items: TombolaItem[]): TombolaItem => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= items[i].weight;

    if (random <= 0)
      return items[i];

  }

  return items[0];
};

/**
 * Calculates the percentage chance of winning a specific item.
 *
 * @param item - The tombola item
 * @param allItems - All items in the tombola
 * @returns The percentage chance as a string with one decimal place
 */
export const calculateChance = (item: TombolaItem, allItems: TombolaItem[]): string => {
  const totalWeight = allItems.reduce((sum, i) => sum + i.weight, 0);
  const percentage = (item.weight / totalWeight) * 100;
  return percentage.toFixed(1);
};


export const findShuffledIndex = (shuffledItems: TombolaItem[], targetItem: TombolaItem): number => {
  const index = shuffledItems.findIndex(item => item === targetItem);
  return index !== -1 ? index : 0;
};
