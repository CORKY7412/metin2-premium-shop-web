import type { ShopItem } from "../models/ShopItem";
import { DUMMY_CATEGORY_1 } from "./CategoryModelMocking";
import { ITEM_DUMMY_MODEL_1, ITEM_DUMMY_MODEL_2 } from "./ItemModelMocking";

const DUMMY_ID = 23;

export const SHOP_ITEM_DUMMY_MODEL_1: ShopItem = {
    id: DUMMY_ID + 1,
    item: ITEM_DUMMY_MODEL_1,
    price: 6,
    description: "Mit diesem Passierschein steht deinen Dungeon-Abenteuern nichts mehr im Wege. Wage dich auf weitere Ebenen und stelle dich der Herausforderung!",
    features: [
        "Ermöglicht das Betreten einer weiteren Ebene",
        "2. Spinnenungeons, Rotdrachenfestung, Meleys Hort (Gruppe), Schiffsverteidigung und Gnollhöhlen",
        "Passierschein muss dem zuständigen Wächter vorgelegt werden",
        "Nicht handelbar"
    ],
    category: DUMMY_CATEGORY_1,
    imageName: "passierschein",
    maxQuantity: 14,
    quantityPercentDelimeter: 7,
} 

export const SHOP_ITEM_DUMMY_MODEL_2: ShopItem = {
    id: DUMMY_ID + 11,
    item: ITEM_DUMMY_MODEL_2,
    price: 80,
    description: "Mit diesem Gutschein im Wert von 50 Drachenmünzen treibst du den Yang-Umsatz in deinem privaten Laden in astronomische Höhen! Ebenfalls eignet er sich als perfektes Geschenk für einen guten Freund. Die Laufzeit des Gutscheins beginnt ab dem Kauf. Durch Rechtsklick einlösbar.",
    features: [
        "Gutschein im Wert von 50 DR",
        "Begrenzte Laufzeit",
    ],
    category: DUMMY_CATEGORY_1,
    imageName: "drgutschein",
    maxQuantity: 1,
    quantityPercentDelimeter: 0,
}

export const mockShopItems: ShopItem[] = [
  SHOP_ITEM_DUMMY_MODEL_1,
  SHOP_ITEM_DUMMY_MODEL_2
];