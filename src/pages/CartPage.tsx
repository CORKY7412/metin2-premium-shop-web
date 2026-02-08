import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { Button } from "../components/common/Button";
import { EmptyCartView } from "../components/cart/EmptyCartView";
import { CartItemCard } from "../components/cart/CartItemCard";
import { RewardInfoBox } from "../components/cart/RewardInfoBox";
import { RewardPopup } from "../components/cart/RewardPopup";
import { generateRewards } from "../utils/rewardsService";
import type { PurchaseReward, CartItem } from "../models/Cart";

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { yabbieCoins, addYabbieCoins, addTombolaTickets } = useUser();
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [currentRewards, setCurrentRewards] = useState<PurchaseReward[]>([]);

  const handlePurchase = (items: CartItem[]) => {
    const rewards = generateRewards(items);

    const totalYabbieCoins = rewards
      .filter(r => r.type === 'yabbie_coins')
      .reduce((sum, r) => sum + (r.amount || 0), 0);

    if (totalYabbieCoins > 0) {
      addYabbieCoins(totalYabbieCoins);
    }

    const tombolaReward = rewards.find(r => r.type === 'tombola_ticket');
    if (tombolaReward?.amount) 
      addTombolaTickets(tombolaReward.amount);
    
    setCurrentRewards(rewards);
    setShowRewardPopup(true);

    items.forEach(item => removeFromCart(item.shopItem.id));
  };

  const handlePurchaseAll = () => handlePurchase(cartItems);
  const handlePurchaseSingle = (item: CartItem) => handlePurchase([item]);

  return (
    <div className="metin-container page-image mx-auto">
      <Header />

      <div className="px-3 sm:px-4 md:px-5">
        <div className="mt-2">
          <Navigation activeTab="" />
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5 pb-5">
          <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-3 sm:mb-4 border-b text-lg sm:text-xl md:text-2xl">
            Warenkorb
          </h2>

          <div className="bg-[rgba(0,0,0,0.3)] p-3 sm:p-4 mb-4 sm:mb-5 border-2 border-[#e8a314] text-center">
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-coins text-[#e8a314] text-xl sm:text-2xl"></i>
              <span className="text-[#f2e69f] text-lg sm:text-xl font-bold">
                Yabbie-Münzen: {yabbieCoins}
              </span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <EmptyCartView />
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                {cartItems.map((cartItem) => (
                  <CartItemCard
                    key={cartItem.shopItem.id}
                    cartItem={cartItem}
                    onPurchase={handlePurchaseSingle}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="bg-[rgba(0,0,0,0.3)] border-2 border-[#e8a314] p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-[#f2e69f] text-lg sm:text-xl mb-2">
                      Gesamtpreis:{" "}
                      <span className="text-[#e8a314] font-bold">{getTotalPrice()} DR</span>
                    </p>
                    <p className="text-[#f2e69f] text-sm">
                      {cartItems.length} Artikel ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items)
                    </p>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      onClick={clearCart}
                      className="flex-1 sm:flex-none close-btn px-4 text-[16px] text-[#f2e69f] font-bold"
                      title="Alles leeren"
                    />
                    <Button
                      title="Alle kaufen"
                      onClick={handlePurchaseAll}
                      className="base-green-btn flex-1 sm:flex-none px-6 text-base"
                    />
                  </div>
                </div>
              </div>

              <RewardInfoBox />
            </>
          )}
        </div>
      </div>

      {showRewardPopup && (
        <RewardPopup
          rewards={currentRewards}
          onClose={() => setShowRewardPopup(false)}
        />
      )}
    </div>
  );
};
