import { Button } from "../common/Button";
import type { CartItem } from "../../models/Cart";

interface CartItemCardProps {
  cartItem: CartItem;
  onPurchase: (item: CartItem) => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const CartItemCard = ({
  cartItem,
  onPurchase,
  onRemove,
  onUpdateQuantity,
}: CartItemCardProps) => {
  const { shopItem, quantity } = cartItem;

  return (
    <div className="bg-[rgba(0,0,0,0.3)] border border-[#662d12] p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 mx-auto sm:mx-0">
          <img
            src={`/images/items/${shopItem.imageName}.png`}
            alt={shopItem.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-[#f2e69f] text-base sm:text-lg font-bold mb-2">
            {shopItem.name}
          </h3>
          <p className="text-[#f2e69f] text-sm mb-2">Preis: {shopItem.price} DR</p>

          {shopItem.maxQuantity > 1 ? (
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => onUpdateQuantity(shopItem.id, quantity - 1)}
                className="quantity-btn px-3 py-1"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-[#f2e69f] font-bold min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(shopItem.id, quantity + 1)}
                className="quantity-btn px-3 py-1"
                disabled={quantity >= shopItem.maxQuantity}
              >
                +
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <span className="text-[#f2e69f] text-sm">Menge: {quantity}</span>
            </div>
          )}

          <p className="text-[#e8a314] text-sm font-bold">
            Gesamt: {shopItem.price * quantity} DR
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 justify-center">
          <Button
            title="Kaufen"
            onClick={() => onPurchase(cartItem)}
            className="base-green-btn flex-1 sm:flex-none px-4 text-sm"
          />
          <button
            onClick={() => onRemove(shopItem.id)}
            className="text-red-500 hover:text-red-700 px-3"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
