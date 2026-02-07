import type { ShopItem } from "../models/ShopItem";
import {
  HIGHLIGHTS_CATEGORY,
  METINPLUS_CATEGORY,
  REDUZIERT_CATEGORY,
  OFFERS_CATEGORY,
  CHARACTER_CATEGORY
} from "./CategoryModelMocking";

const DUMMY_ID = 23;

export const SHOP_ITEM_DUMMY_MODEL_1: ShopItem = {
  id: DUMMY_ID + 1,
  name: "Passierschein",
  price: 6,
  description: "Mit diesem Passierschein steht deinen Dungeon-Abenteuern nichts mehr im Wege.",
  features: [
    "Ermöglicht das Betreten einer weiteren Ebene",
    "Nicht handelbar"
  ],
  category: METINPLUS_CATEGORY,
  imageName: "passierschein",
  maxQuantity: 14,
  quantityPercentDelimeter: 7,
  isNew: false,
  isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_2: ShopItem = {
  id: DUMMY_ID + 2,
  name: "DR-Gutschein (50)",
  price: 80,
  description: "Mit diesem Gutschein im Wert von 50 Drachenmünzen treibst du den Yang-Umsatz in astronomische Höhen!",
  features: [
    "Gutschein im Wert von 50 DR",
    "Begrenzte Laufzeit",
  ],
  category: REDUZIERT_CATEGORY,
  imageName: "drgutschein",
  maxQuantity: 1,
  quantityPercentDelimeter: 0,
  isNew: false,
  isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_3: ShopItem = {
  id: DUMMY_ID + 3,
  name: "Schmuckschatulle",
  price: 99,
  description: "Du willst noch schneller stärker werden? Schau in die Schatulle!",
  features: [
    "Zufallstruhe",
    "Chance auf Ring, Amulett, Lolli oder Trank",
  ],
  category: OFFERS_CATEGORY,
  imageName: "schmuckschatulle",
  maxQuantity: 1,
  quantityPercentDelimeter: 0,
  isNew: true,
  isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_4: ShopItem = {
  id: DUMMY_ID + 4,
  name: "Autojagd",
  price: 49,
  description: "Hiermit greift dein Charakter bei der automatischen Jagd nicht nur Monster an.",
  features: [
    "Automatisches Angreifen von Monstern",
    "Automatische Benutzung von Fertigkeiten",
  ],
  category: CHARACTER_CATEGORY,
  imageName: "autojagd",
  maxQuantity: 1,
  quantityPercentDelimeter: 0,
  isNew: true,
  isHot: false
}

export const SHOP_ITEM_DUMMY_MODEL_5: ShopItem = {
  id: DUMMY_ID + 5,
  name: "Gegenstand verzaubern",
  price: 15,
  description: "Tausche mithilfe von Gegenstand verzaubern die bisherigen Boni eines deiner Ausrüstungsgegenstände gegen die gleiche Anzahl neuer Boni aus. Diese werden zufällig bestimmt.",
  features: [
    "Tauscht 1x Boni eines Items gegen zufällige neue aus",
    "Gilt nur für die Boni 1-5"
  ],
  category: HIGHLIGHTS_CATEGORY,
  imageName: "verzaubern",
  maxQuantity: 50,
  quantityPercentDelimeter: 10,
  isNew: false,
  isHot: false
}

export const SHOP_ITEM_DUMMY_MODEL_6: ShopItem = {
  id: DUMMY_ID + 6,
  name: "Segensschriftrolle",
  price: 25,
  description: "Diese Schriftrolle schützt dein Item vor dem Zerbrechen.",
  features: [
    "Verhindert Itemverlust bei gescheiterter Veredelung",
    "Einmaliger Gebrauch"
  ],
  category: HIGHLIGHTS_CATEGORY,
  imageName: "segi",
  maxQuantity: 20,
  quantityPercentDelimeter: 5,
  isNew: false,
  isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_7: ShopItem = {
  id: DUMMY_ID + 7,
  name: "Atlantiskrieger+ ",
  price: 199,
  description: "Eine schlachtenerprobte Rüstung für alle mächtigen Krieger der Tiefen. Eine Atlantiskrone+ oder ein Atlantishelm+, Kneifi und eine Heldenmedaille verleihen dir jeweils zusätzliche Set-Boni.",
  features: [
    "1 bis 3 zufällige Boni",
    "Kostüm mit Set-Bonus",
    "Kostüm für männliche Charaktere",
    "Begrenzte Laufzeit ab Kauf"
  ],
  category: HIGHLIGHTS_CATEGORY,
  imageName: "atlantisbrust",
  maxQuantity: 1,
  quantityPercentDelimeter: 0,
  isNew: true,
  isHot: true
}

export const SHOP_ITEM_DUMMY_MODEL_8: ShopItem = {
  id: DUMMY_ID + 8,
  name: "Ahnenwächter-Schwert+",
  price: 299,
  description: "",
  features: [
    "Exklusiver Inhalt",
    "Begrenzte Verfügbarkeit"
  ],
  category: HIGHLIGHTS_CATEGORY,
  imageName: "ahnenwaechterschwert",
  maxQuantity: 1,
  quantityPercentDelimeter: 0,
  isNew: true,
  isHot: true
}

export const mockShopItems: ShopItem[] = [
  SHOP_ITEM_DUMMY_MODEL_1,
  SHOP_ITEM_DUMMY_MODEL_2,
  SHOP_ITEM_DUMMY_MODEL_3,
  SHOP_ITEM_DUMMY_MODEL_5,
  SHOP_ITEM_DUMMY_MODEL_6,
  SHOP_ITEM_DUMMY_MODEL_7,
  SHOP_ITEM_DUMMY_MODEL_8,

];