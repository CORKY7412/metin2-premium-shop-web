import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../models/Cart';
import type { ShopItem } from '../models/ShopItem';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ShopItem, quantity?: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: ShopItem, quantity: number = 1) => {

    setCartItems(prev => {
      const existingItem = prev.find(ci => ci.shopItem.id === item.id);

      if (existingItem) {

        return prev.map(ci =>
          ci.shopItem.id === item.id
            ? { ...ci, quantity: Math.min(ci.quantity + quantity, item.maxQuantity) }
            : ci
        );
      }

      return [...prev, { shopItem: item, quantity, addedAt: new Date() }];

    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(ci => ci.shopItem.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(ci =>
        ci.shopItem.id === itemId
          ? { ...ci, quantity: Math.max(1, Math.min(quantity, ci.shopItem.maxQuantity)) }
          : ci
      )
    );
  };

  const incrementQuantity = (itemId: number) => {
    setCartItems(prev =>
      prev.map(ci =>
        ci.shopItem.id === itemId
          ? { ...ci, quantity: Math.min(ci.quantity + 1, ci.shopItem.maxQuantity) }
          : ci
      )
    );
  };

  const decrementQuantity = (itemId: number) => {
    setCartItems(prev =>
      prev.map(ci =>
        ci.shopItem.id === itemId
          ? { ...ci, quantity: Math.max(1, ci.quantity - 1) }
          : ci
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.shopItem.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) 
    throw new Error('useCart must be used within CartProvider');
  
  return context;
};
