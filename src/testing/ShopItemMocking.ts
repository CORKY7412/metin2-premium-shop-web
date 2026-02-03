import type { ShopItem } from "../models/ShopItem";
import { DUMMY_CATEGORY_1 } from "./CategoryModelMocking";

const DUMMY_ID = 23;

export const SHOP_ITEM_DUMMY_MODEL_1: ShopItem = {
    id: DUMMY_ID + 1,
    name: "Passierschein",
    price: 6,
    description: "Mit diesem Passierschein steht deinen Dungeon-Abenteuern nichts mehr im Wege. Wage dich auf weitere Ebenen und stelle dich der Herausforderung!",
    features: [
        "Ermöglicht das Betreten einer weiteren Ebene",
        "2. Spinnenungeons, Rotdrachenfestung, Meleys Hort (Gruppe), Schiffsverteidigung und Gnollhöhlen",
        "Passierschein muss dem zuständigen Wächter vorgelegt werden",
        "Nicht handelbar"
    ],
    category: [DUMMY_CATEGORY_1],
    imageName: "passierschein",
    maxQuantity: 14,
    quantityPercentDelimeter: 7,
    isNew: false,
    isHot: false
} 

export const SHOP_ITEM_DUMMY_MODEL_2: ShopItem = {
    id: DUMMY_ID + 11,
    name: "DR-Gutschein (50)",
    price: 80,
    description: "Mit diesem Gutschein im Wert von 50 Drachenmünzen treibst du den Yang-Umsatz in deinem privaten Laden in astronomische Höhen! Ebenfalls eignet er sich als perfektes Geschenk für einen guten Freund. Die Laufzeit des Gutscheins beginnt ab dem Kauf. Durch Rechtsklick einlösbar.",
    features: [
        "Gutschein im Wert von 50 DR",
        "Begrenzte Laufzeit",
    ],
    category: [DUMMY_CATEGORY_1],
    imageName: "drgutschein",
    maxQuantity: 1,
    quantityPercentDelimeter: 0,
    isNew: false,
    isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_3: ShopItem = {
    id: DUMMY_ID + 111,
    name: "Schmuckschatulle",
    price: 80,
    description: "Du willst noch schneller stärker werden? Schau in die Schatulle und sichere dir einen Ring, ein Amulett, einen Lolli oder Trank mit mächtigen Boosts!",
    features: [
        "Zufallstruhe",
        "Chance auf Ring, Amulett, Lolli oder Trank",
        "EXP-Boosts und mehr!"
    ],
    category: [DUMMY_CATEGORY_1],
    imageName: "schmuckschatulle ",
    maxQuantity: 1,
    quantityPercentDelimeter: 0,
    isNew: true,
    isHot: false
}



export const mockShopItems: ShopItem[] = [
  SHOP_ITEM_DUMMY_MODEL_1,
  SHOP_ITEM_DUMMY_MODEL_2
];