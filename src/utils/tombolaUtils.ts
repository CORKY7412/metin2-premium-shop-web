import type { TombolaItem, TombolaTier } from "../models/TombolaItem";
import {
  tombolaTier1Items,
  tombolaTier2Items,
  tombolaTier3Items,
} from "../testing/TombolaItemMocking";

/**
 * Returns tombola items for a specific tier.
 * @param tier - The tier level (1, 2, or 3)
 * @returns Array of tombola items for the specified tier
 * @throws Error if an invalid tier is provided
 */
export const getTombolaItemsByTier = (tier: TombolaTier): TombolaItem[] => {
  switch (tier) {
    case 1:
      return tombolaTier1Items;
    case 2:
      return tombolaTier2Items;
    case 3:
      return tombolaTier3Items;
    default:
      throw new Error(`Invalid tombola tier: ${tier}`);
  }
};
