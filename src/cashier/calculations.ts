import { CartItem } from './pos.types';

export const calculateSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    const price = item.modifiedPrice ?? item.price;
    if (item.priceType === "weight") {
      return total + price * (item.weight || 0);
    }
    return total + price * item.quantity;
  }, 0);
};

export const calculateTotal = (subtotal: number): number => {
  return Math.max(subtotal, 0);
};

export const calculateChange = (total: number, customerCash: number): number => {
  return Math.max(customerCash - total, 0);
};

export const calculateTotalItems = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateUniqueProducts = (cart: CartItem[]): number => {
  return cart.length;
};
