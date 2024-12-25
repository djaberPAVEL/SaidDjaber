import { useState, useMemo } from 'react';
import { CartItem, Discount } from '../types/pos.types';
import { BillDenominations, BILL_DENOMINATIONS } from '../constants/bills';

export const useTransaction = (cart: CartItem[]) => {
  const [customerCash, setCustomerCash] = useState<string>("");
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [bills, setBills] = useState<BillDenominations>(BILL_DENOMINATIONS);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.modifiedPrice ?? item.price;
      return total + price * (item.priceType === "weight" ? item.weight || 0 : item.quantity);
    }, 0);
  }, [cart]);

  const total = useMemo(() => {
    const discountAmount = discount
      ? discount.type === "percentage"
        ? subtotal * (discount.value / 100)
        : discount.value
      : 0;
    return Math.max(subtotal - discountAmount, 0);
  }, [subtotal, discount]);

  const change = useMemo(() => {
    return Math.max((parseFloat(customerCash) || 0) - total, 0);
  }, [total, customerCash]);

  const handleBillChange = (denomination: number, count: number) => {
    setBills((prevBills) => ({
      ...prevBills,
      [denomination]: count,
    }));
  };

  return {
    customerCash,
    setCustomerCash,
    discount,
    setDiscount,
    bills,
    handleBillChange,
    subtotal,
    total,
    change
  };
};
