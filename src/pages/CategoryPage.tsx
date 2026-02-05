import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { ShopItem } from "../models/ShopItem";
import { mockShopItems } from "../testing/ShopItemMocking";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { ItemCard } from "../components/common/ItemCard";
import { Modal } from "../components/common/Modal/Modal";
import { ItemDescriptionPage } from "./ItemDescriptionPage";
import { SubNavigation } from "../components/pages/CategoryPage/SubNavigation";
import { buildCategoryTree, filterItemsByCategory } from "../utils/categoryHelper";

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [allItems, setAllItems] = useState<ShopItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>([]);

  const activeCategoryId = searchParams.get('cat') ? Number(searchParams.get('cat')) : undefined;
  const activeSubCategoryId = searchParams.get('sub') ? Number(searchParams.get('sub')) : undefined;

  useEffect(() => {
    let items: ShopItem[] = [];
    
    switch (categoryId) {
      case 'all':
        items = mockShopItems;
        break;
      case 'new':
        items = mockShopItems.filter(item => item.isNew === true);
        break;
      case 'hot':
        items = mockShopItems.filter(item => item.isHot === true);
        break;
      default:
        items = mockShopItems;
    }
    
    setAllItems(items);
  }, [categoryId]);

  const categoryTree = buildCategoryTree(allItems);

  useEffect(() => {
    if (!activeCategoryId && !activeSubCategoryId && categoryTree.length > 0) {
      const firstCategory = categoryTree[0];
      setSearchParams({ cat: firstCategory.category.id.toString() });
    }
  }, [activeCategoryId, activeSubCategoryId, categoryTree, setSearchParams]);

  useEffect(() => {
    const filtered = filterItemsByCategory(allItems, activeCategoryId, activeSubCategoryId);
    setFilteredItems(filtered);
  }, [allItems, activeCategoryId, activeSubCategoryId]);

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleBuyClick = (item: ShopItem, quantity: number) => {
    console.log(`Kaufe ${quantity}x ${item.name}`);
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
        
        <div className="pr-5 pl-5">
          <div className="mt-2">
            <Navigation 
              activeTab={categoryId || 'all'}
            />
          </div>
          
          <div className="mt-5">
            <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-2.5 border-b">
              {getCategoryTitle()}
            </h2>

            {/* Sub Nav */}
            <div className="flex">
              <SubNavigation 
                categories={categoryTree}
                activeCategoryId={activeCategoryId}
                activeSubCategoryId={activeSubCategoryId}
                onCategoryClick={handleCategoryClick}
                onSubCategoryClick={handleSubCategoryClick}
              />
              
              {filteredItems.length > 0 ? (
                <div className="overflow-y-auto h-100">
                  <ItemCard
                    items={filteredItems}
                    onItemClick={handleItemClick}
                    onBuyClick={handleBuyClick}
                  />
                </div>
              ) : (
                <p className="text-[#f2e69f] text-center py-10">
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