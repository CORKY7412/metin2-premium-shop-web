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
      <div className="mt-5 p-5 bg-[#eade9e]">

        {/* Header */}
        <header className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#5a3825] mb-2">
              {shopItem.name}
            </h2>
          </div>

          {/* Preis */}
          <div className="text-right">
            <span className="text-sm text-[#5a3825] mr-2">Preis:</span>
            <span className="text-4xl font-bold text-[#5a3825]">
              {totalPrice}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">

          {/* Left: Image */}
          <div className="flex items-center justify-center grey-box">
            <img
              src={itemImageUrl}
              alt={shopItem.name}
              className="h-auto max-h-44 max-w-44"
            />
          </div>

          {/* Right: Info */}
          <div className="md:col-span-2 contrast-box grey-box">
            <div className="tab-content">
              <p className="text-[#5a3825] mb-3">Info</p>

              {/* Features List */}
              <ul className="mb-4 list-disc list-inside">
                {shopItem.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Long Description */}
            {shopItem.description && (
              <p className="mt-4 p-3 bg-white/20 border-l-4 border-[#8b4513] text-[#5a3825]">
                {shopItem.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div className="mt-1 p-5 shadow-[0px_1px_2px_#000] bg-[#eade9e]">
        <div className="contrast-box grey-box">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            <div className="md:col-span-2">
              <QuantitySelection
                maxQuantity={shopItem.maxQuantity}
                quantityPercentDelimeter={shopItem.quantityPercentDelimeter}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            </div>

            <div className="text-center">
              <p>Jetzt erhältlich für:</p>
              <p className="text-3xl font-bold text-[#5a3825]">{totalPrice}</p>
              <BuyButton shopItem={shopItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}