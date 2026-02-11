import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { ShopItem } from "../models/ShopItem";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { ItemCard } from "../components/common/ItemCard";
import { Modal } from "../components/common/Modal/Modal";
import { ItemDescriptionPage } from "./ItemDescriptionPage";
import { SubNavigation } from "../components/pages/CategoryPage/SubNavigation";
import { buildCategoryTree, filterItemsByCategory } from "../utils/categoryHelper";
import { api } from "../services/api";

let shopItemsCache: ShopItem[] | null = null;

const filterByView = (items: ShopItem[], view: string | undefined): ShopItem[] => {
  switch (view) {
    case 'new': return items.filter(i => i.isNew === true);
    case 'hot': return items.filter(i => i.isHot === true);
    default:    return items;
  }
};

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [allItems, setAllItems] = useState<ShopItem[]>(() =>
    shopItemsCache ? filterByView(shopItemsCache, categoryId) : []
  );

  const activeCategoryId = searchParams.get('cat') ? Number(searchParams.get('cat')) : undefined;
  const activeSubCategoryId = searchParams.get('sub') ? Number(searchParams.get('sub')) : undefined;

  useEffect(() => {
    if (shopItemsCache) {
      setAllItems(filterByView(shopItemsCache, categoryId));
      return;
    }

    api.shop.getItems()
      .then(items => {
        shopItemsCache = items;
        setAllItems(filterByView(items, categoryId));
      })
      .catch(err => console.error('Fehler beim Laden der Items:', err));
  }, [categoryId]);

  const categoryTree = useMemo(() => buildCategoryTree(allItems), [allItems]);

  const effectiveActiveCategoryId = activeCategoryId ?? categoryTree[0]?.category.id;

  const filteredItems = useMemo(
    () => filterItemsByCategory(allItems, effectiveActiveCategoryId, activeSubCategoryId),
    [allItems, effectiveActiveCategoryId, activeSubCategoryId]
  );

  useEffect(() => {
    if (!activeCategoryId && !activeSubCategoryId && categoryTree.length > 0) {
      const firstCategory = categoryTree[0];
      setSearchParams({ cat: firstCategory.category.id.toString() });
    }
  }, [activeCategoryId, activeSubCategoryId, categoryTree, setSearchParams]);

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCategoryClick = (categoryId: number) => {
    setSearchParams({ cat: categoryId.toString() });
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    setSearchParams({ sub: subCategoryId.toString() });
  };

  const getCategoryTitle = () => {
    switch (categoryId) {
      case 'all':
        return 'Alle Artikel';
      case 'new':
        return 'Neue Artikel';
      case 'hot':
        return 'Beliebte Artikel';
      case 'sale':
        return 'Reduzierte Artikel';
      case 'wheel':
        return 'Rad des Cor Daemonis';
      default:
        return 'Artikel';
    }
  };

  return (
    <>
      <div className="metin-container page-image mx-auto">
        <Header />

        <div className="px-3 sm:px-4 md:px-5">
          <div className="mt-2">
            <Navigation
              activeTab={categoryId || 'all'}
            />
          </div>

          <div className="mt-3 sm:mt-4 md:mt-5">
            <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-2 sm:mb-2.5 border-b text-lg sm:text-xl md:text-2xl">
              {getCategoryTitle()}
            </h2>

            <div className="flex flex-col md:flex-row gap-2 md:gap-0">
              <SubNavigation
                categories={categoryTree}
                activeCategoryId={effectiveActiveCategoryId}
                activeSubCategoryId={activeSubCategoryId}
                onCategoryClick={handleCategoryClick}
                onSubCategoryClick={handleSubCategoryClick}
              />

              {filteredItems.length > 0 ? (
                <div className="overflow-y-auto h-75 sm:h-87.5 md:h-100 flex-1">
                  <ItemCard
                    items={filteredItems}
                    onItemClick={handleItemClick}
                  />
                </div>
              ) : (
                <p className="text-[#f2e69f] text-center py-6 sm:py-8 md:py-10 flex-1">
                  Keine Artikel in dieser Kategorie gefunden.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedItem && (
          <ItemDescriptionPage shopItem={selectedItem} />
        )}
      </Modal>
    </>
  );
};