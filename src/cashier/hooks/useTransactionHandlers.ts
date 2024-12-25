import { useState, useEffect, useMemo } from 'react';
import { CartItem, Discount } from "../types/pos.types";
import { BILL_DENOMINATIONS, BillDenominations } from "../constants/bills";

interface TransactionStats {
  subtotal: number;
  total: number;
  change: number;
}

export const useTransactionHandlers = (cart: CartItem[], discount: Discount | null = null) => {
  const [bills, setBills] = useState<BillDenominations>(BILL_DENOMINATIONS);
  const [customerCash, setCustomerCash] = useState<string>("");

  // Calculate transaction stats
  const transactionStats = useMemo<TransactionStats>(() => {
    const subtotal = cart.reduce((total, item) => {
      const price = item.modifiedPrice ?? item.price;
      return total + price * (item.priceType === "weight" ? item.weight || 0 : item.quantity);
    }, 0);

    const discountAmount = discount
      ? discount.type === "percentage"
        ? subtotal * (discount.value / 100)
        : discount.value
      : 0;

    const total = Math.max(subtotal - discountAmount, 0);
    const change = Math.max((parseFloat(customerCash) || 0) - total, 0);

    return { subtotal, total, change };
  }, [cart, discount, customerCash]);

  const calculateTotalCash = () => {
    return Object.entries(bills).reduce(
      (total, [denomination, count]) => total + parseInt(denomination) * count,
      0
    );
  };

  useEffect(() => {
    setCustomerCash(calculateTotalCash().toString());
  }, [bills]);

  const transactionHandlers = {
    handleBillChange: (denomination: number, count: number) => {
      setBills(prev => ({ ...prev, [denomination]: count }));
    },
    processTransaction: () => {
      if (parseFloat(customerCash) >= transactionStats.total) {
        alert(`اكتمل الدفع! المبلغ المتبقي: ${transactionStats.change.toFixed(2)} د.ج`);
        return true;
      } else {
        alert("النقود غير كافية");
        return false;
      }
    },
    setCustomerCash,
    clearCustomerCash: () => setCustomerCash(""),
    resetBills: () => setBills(BILL_DENOMINATIONS)
  };

  return {
    bills,
    customerCash,
    transactionStats,
    transactionHandlers
  };
};
