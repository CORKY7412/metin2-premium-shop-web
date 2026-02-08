import { useState } from 'react';
import type { ShopItem } from '../../models/ShopItem';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

type AddToCartButtonProps = {
  shopItem: ShopItem;
  quantity?: number;
  title?: string;
  showQuantity?: boolean;
}

export const AddToCartButton = ({
  shopItem,
  quantity = 1,
  title = "In den Warenkorb",
  showQuantity = false
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = () => {
    addToCart(shopItem, quantity);

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
  };

  const baseStyle = "base-green-btn w-full relative";

  return (
    <div className="relative">
      <Button
        title={showFeedback ? "Hinzugefügt" : (showQuantity ? `${title} (${quantity}x)` : title)}
        onClick={handleAddToCart}
        className={`${baseStyle} ${showFeedback ? 'bg-green-600' : ''}`}
      />
    </div>
  );
};
