import { useState } from "react";
import { HeroSlider } from "../components/common/HeroSlider/HeroSlider"
import { Slide } from "../components/common/HeroSlider/Slide"
import { Header } from "../components/pages/ShopPage/Header"
import { ItemCard } from "../components/common/ItemCard";
import type { ShopItem } from "../models/ShopItem";
import { Modal } from "../components/common/Modal/Modal";
import { ItemDescriptionPage } from "./ItemDescriptionPage";
import { Navigation } from "../components/common/Navigation/Navigation";


function ShopPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  setActiveTab

  return (
    <>
      <div className="metin-container page-image mx-auto">
        <Header />

        <div className="px-3 sm:px-4 md:px-5">
          <div className="mt-2">
            <Navigation activeTab={activeTab} />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-5 mt-3 sm:mt-5">
            <div className="sm:col-span-2 md:col-span-2">
              <HeroSlider autoPlay showArrows interval={10000}>
                <Slide imageUrl="/images/events/event_1.jpg"
                  redirectUrl="/event">
                  <div className="slider-banner">
                    <h3>Event</h3>
                    <p>Begib dich auf Beutezug mit der neuen Loot-Box im Shop: Schnee-Leonidas &amp; Loot-Pass erwarten dich!</p>
                  </div>
                </Slide>
                <Slide imageUrl="/images/events/event_3.jpg"
                  redirectUrl="/event">
                  <div className="slider-banner">
                    <h3>Scam</h3>
                    <p>Lass dich heute mal fett scammen von uns ! :D</p>
                  </div>
                </Slide>
              </HeroSlider>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <HeroSlider autoPlay showArrows interval={200000}>
                <Slide
                  imageUrl="/images/events/event_2.jpg"
                  redirectUrl="/event">
                  <div className="slider-banner">
                    <h3>Event</h3>
                    <p>Jetzt gehts ab</p>
                  </div>
                </Slide>
              </HeroSlider>
            </div>
          </div>

          <div className="mt-3 sm:mt-5 pb-5">
            <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-2 sm:mb-2.5 border-b text-lg sm:text-xl md:text-2xl">Beliebte Artikel</h2>

            <ItemCard
              isCarousel={true}
              onlyHot={true}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedItem && (
          <ItemDescriptionPage shopItem={selectedItem} />
        )}
      </Modal>
    </>
  )
}

export default ShopPage