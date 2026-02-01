import { HeroSlider } from "../components/common/HeroSlider/HeroSlider"
import { Slide } from "../components/common/HeroSlider/Slide"
import { Header } from "../components/pages/ShopPage/Header"
import { ItemCarousel } from "../components/pages/ShopPage/ItemCarousel";
import type { ShopItem } from "../models/ShopItem";
import { mockShopItems } from "../testing/ShopItemMocking";


function ShopPage() {

  const handleItemClick = (item: ShopItem) => {
    window.location.href = `/item/${item.id}`;
  };

  const handleBuyClick = (item: ShopItem, quantity: number) => {
    console.log(`Kaufe ${quantity}x ${item.item.name}`);
  };

  return (
    <>
      <div className="metin-container page-image mx-auto ">
        <Header />

        <div className="pr-5 pl-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5 mt-5">
            <div className="md:col-span-2">
              <HeroSlider autoPlay showArrows interval={10000}>
                <Slide imageUrl="/images/events/event_1.jpg"
                  redirectUrl="/event">
                  <div className="slider-banner">
                    <h3>Event</h3>
                    <p>Begib dich auf Beutezug mit der neuen Loot-Box im Shop: Schnee-Leonidas &amp; Loot-Pass erwarten dich!</p>
                  </div>
                </Slide>
              </HeroSlider>
            </div>

            <div className="md:col-span-1">
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

          <div className="mt-5">
            <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-2.5 border-b ">Beliebte Artikel</h2>

            <ItemCarousel
              items={mockShopItems}
              onItemClick={handleItemClick}
              onBuyClick={handleBuyClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopPage
