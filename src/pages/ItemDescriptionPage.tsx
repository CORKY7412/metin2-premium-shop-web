import { useState } from "react";
import { BuyButton } from "../components/common/BuyButton";
import type { ShopItem } from "../models/ShopItem"
import { QuantitySelection } from "../components/pages/ItemDescriptionPage/QuantitySelection";

type ItemDescriptionPageProps = { shopItem: ShopItem, isInModal?: boolean; }



export const ItemDescriptionPage = ({ shopItem, isInModal = true }: ItemDescriptionPageProps) => {

  const itemImageUrl = "/images/items/" + shopItem.imageName + ".png";

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const totalPrice = shopItem.price * selectedQuantity;

  return (
    <div className={`
      ${isInModal ? 'bg-[rgba(0,0,0,0.3)]' : 'max-w-2xl mx-auto'}
    `}>
      <div className="mt-3 sm:mt-4 md:mt-5 p-3 sm:p-4 md:p-5 bg-[#eade9e]">

        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4 md:mb-5">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5a3825] mb-1 sm:mb-2 leading-tight">
              {shopItem.name}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs sm:text-sm text-[#5a3825] mr-2">Preis:</span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5a3825]">
              {totalPrice}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">

          <div className="flex items-center justify-center grey-box min-h-37.5 sm:min-h-45">
            <img
              src={itemImageUrl}
              alt={shopItem.name}
              className="h-auto max-h-32 max-w-32 sm:max-h-40 sm:max-w-40 md:max-h-44 md:max-w-44 object-contain"
            />
          </div>

          <div className="sm:col-span-1 md:col-span-2 contrast-box grey-box">
            <div className="tab-content px-3 sm:px-4">
              <p className="text-[#5a3825] mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Info</p>

              <ul className="mb-3 sm:mb-4 list-disc list-inside text-xs sm:text-sm space-y-0.5">
                {shopItem.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {shopItem.description && (
              <p className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white/20 border-l-4 border-[#8b4513] text-[#5a3825] text-xs sm:text-sm">
                {shopItem.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1 p-3 sm:p-4 md:p-5 shadow-[0px_1px_2px_#000] bg-[#eade9e]">
        <div className="contrast-box grey-box">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">

            <div className="sm:col-span-1 md:col-span-2">
              <QuantitySelection
                maxQuantity={shopItem.maxQuantity}
                quantityPercentDelimeter={shopItem.quantityPercentDelimeter}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            </div>

            <div className="text-center">
              <p className="text-xs sm:text-sm mb-1">Jetzt erhältlich für:</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#5a3825] mb-2">{totalPrice}</p>
              <BuyButton shopItem={shopItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}