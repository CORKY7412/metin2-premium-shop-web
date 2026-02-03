import type { Category } from "../models/Category";

const DUMMY_ID = 23;

export const HIGHLIGHTS_CATEGORY: Category = {
    id: DUMMY_ID + 11,
    name: "Highlights",
}

export const METINPLUS_CATEGORY: Category = {
    id: DUMMY_ID + 111,
    name: "Metin+",
    parentCategory: HIGHLIGHTS_CATEGORY
}