import type { TombolaItem } from "../models/TombolaItem";
import {
  SHOP_ITEM_DUMMY_MODEL_1,
  SHOP_ITEM_DUMMY_MODEL_2,
  SHOP_ITEM_DUMMY_MODEL_3,
  SHOP_ITEM_DUMMY_MODEL_5,
  SHOP_ITEM_DUMMY_MODEL_6,
  SHOP_ITEM_DUMMY_MODEL_7,
  SHOP_ITEM_DUMMY_MODEL_8,
} from "./ShopItemMocking";

// Tier 1
export const tombolaTier1Items: TombolaItem[] = [
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_1,
    weight: 25,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_5,
    weight: 25,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_6,
    weight: 20,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_2,
    weight: 10,
  },
  {
    isPenalty: true,
    penaltyText: "Pech gehabt!",
    weight: 10,
  },
  {
    isPenalty: true,
    penaltyText: "Nichts gewonnen",
    weight: 10,
  },
];

// Tier 2
export const tombolaTier2Items: TombolaItem[] = [
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_3,
    weight: 20,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_6,
    weight: 15,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_7,
    weight: 10,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_2,
    weight: 8,
  },
  {
    isPenalty: true,
    penaltyText: "Leider verloren!",
    weight: 20,
  },
  {
    isPenalty: true,
    penaltyText: "Kein Gewinn",
    weight: 17,
  },
  {
    isPenalty: true,
    penaltyText: "Versuch es nochmal",
    weight: 10,
  },
];

// Tier 3
export const tombolaTier3Items: TombolaItem[] = [
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_8,
    weight: 8,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_7, 
    weight: 7,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_2, 
    weight: 15,
  },
  {
    shopItem: SHOP_ITEM_DUMMY_MODEL_3, 
    weight: 10,
  },
  {
    isPenalty: true,
    penaltyText: "Alles verloren!",
    weight: 25,
  },
  {
    isPenalty: true,
    penaltyText: "Großes Pech!",
    weight: 20,
  },
  {
    isPenalty: true,
    penaltyText: "Nichts gewonnen",
    weight: 15,
  },
];
