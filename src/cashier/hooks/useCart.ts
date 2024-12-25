import { useState, useMemo } from 'react';
import { Product, CartItem } from '../types/pos.types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number, weight?: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
              ...(weight !== undefined && { weight }),
            }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartStats = useMemo(() => ({
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    uniqueProducts: cart.length
  }), [cart]);

  return {
    cart,
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartStats
  };
};
