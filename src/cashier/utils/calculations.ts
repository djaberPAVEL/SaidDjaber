const calculateSubtotal = (cart) => {
  return cart.reduce((total, item) => {
    const price = item.modifiedPrice ?? item.price;
    return total + price * item.quantity;
  }, 0);
};

const calculateTotalWithTax = (subtotal, taxRate) => {
  return subtotal + subtotal * taxRate;
};

const calculateDiscountedTotal = (total, discount) => {
  return total - discount;
};

export { calculateSubtotal, calculateTotalWithTax, calculateDiscountedTotal };