import type { ShopItem } from "../models/ShopItem";
import type { Category } from "../models/Category";

export interface CategoryWithSubs {
  category: Category;
  subCategories: Category[];
}

export const buildCategoryTree = (items: ShopItem[]): CategoryWithSubs[] => {
  const categoryMap = new Map<number, Category>();
  const mainCategories = new Map<number, CategoryWithSubs>();

  items.forEach(item => {

    if (item.category) {
      categoryMap.set(item.category.id, item.category);

      if (item.category.parentCategory)
        categoryMap.set(item.category.parentCategory.id, item.category.parentCategory);

    }
  });

  categoryMap.forEach(category => {
    
    if (category.parentCategory) {
      const parentId = category.parentCategory.id;

      if (!mainCategories.has(parentId)) {
        mainCategories.set(parentId, {
          category: category.parentCategory,
          subCategories: []
        });
      }

      const existing = mainCategories.get(parentId)!;
      if (!existing.subCategories.find(sub => sub.id === category.id))
        existing.subCategories.push(category);

    } else {
      if (!mainCategories.has(category.id)) {
        mainCategories.set(category.id, {
          category: category,
          subCategories: []
        });
      }
    }
  });

  const result = Array.from(mainCategories.values());
  result.sort((a, b) => a.category.id - b.category.id);
  result.forEach(entry => entry.subCategories.sort((a, b) => a.id - b.id));
  return result;
};


export const filterItemsByCategory = (
  items: ShopItem[],
  mainCategoryId?: number,
  subCategoryId?: number
): ShopItem[] => {
  if (subCategoryId) 
    return items.filter(item => item.category?.id === subCategoryId);
  

  if (mainCategoryId) {
    return items.filter(item => {

      if (item.category?.id === mainCategoryId)
        return true;
      

      if (item.category?.parentCategory?.id === mainCategoryId)
        return true;
      

      return false;
    });
  }

  return items;
};