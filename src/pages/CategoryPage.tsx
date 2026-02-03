import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ShopItem } from "../models/ShopItem";
import { mockShopItems } from "../testing/ShopItemMocking";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { ItemCarousel } from "../components/pages/ShopPage/ItemCarousel";
import { Modal } from "../components/common/Modal/Modal";
import { ItemDescriptionPage } from "./ItemDescriptionPage";
export const CategoryPage = () => {

  const { categoryId } = useParams<{ categoryId: string }>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>([]);
  
  useEffect(() => {
    let items: ShopItem[] = [];
    
    switch (categoryId) {
      case 'all':
        items = mockShopItems;
        break;
    }
    
    setFilteredItems(items);
  }, [categoryId]);
  
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
  
  const getCategoryTitle = () => {
    switch (categoryId) {
      case 'all':
        return 'Alle Artikel';
      case 'new':
        return 'Neue Artikel';
      case 'popular':
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
            
            {filteredItems.length > 0 ? (
              <ItemCarousel
                items={filteredItems}
                onItemClick={handleItemClick}
                onBuyClick={handleBuyClick}
              />
            ) : (
              <p className="text-[#f2e69f] text-center py-10">
                Keine Artikel in dieser Kategorie gefunden.
              </p>
            )}
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