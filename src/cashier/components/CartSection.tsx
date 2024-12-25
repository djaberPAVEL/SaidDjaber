import React, { useState } from 'react';
import { ShoppingCart, Trash2, Edit2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem, Product, Discount, DialogHandlers, TransactionStats } from '../types/pos.types';
import NumericKeypad from '../NumericKeypad';

import { BillDenominations } from '../constants/bills';
import { themeColors } from '../theme/colors';


interface CartSectionProps {
  cart: CartItem[];
  discount: Discount | null;
  transactionStats: {
    subtotal: number;
    total: number;
    change: number;
  };
  bills: BillDenominations;
  customerCash: string;
  showKeypad?: boolean;
  customColor?: { base: string; lighter: string };
  cartOperations: {
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, quantity: number, weight?: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    setDiscount: (discount: Discount | null) => void;
  };
  transactionHandlers: {
    handleBillChange: (denomination: number, count: number) => void;
    processTransaction: () => void;
    setCustomerCash: (value: string) => void;
    clearCustomerCash: () => void;
    resetBills: () => void;
  };
  dialogHandlers: {
    onToggleKeypad: () => void;
    onKeypadNumberClick: (value: string) => void;
    onKeypadClear: () => void;
    onPrintReceipt: () => void;
    openWeightDialog: (product: Product) => void;
    openPriceModifyDialog: (item: CartItem) => void;
  };
}

export const CartSection: React.FC<CartSectionProps> = ({
  cart,
  discount,
  transactionStats,
  bills,
  customerCash,
  showKeypad = false,
  customColor = themeColors.primary,
  cartOperations,
  transactionHandlers,
  dialogHandlers,
}) => {
  const [quantityEditItem, setQuantityEditItem] = useState<CartItem | null>(null);

  // Calculate cart totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueProducts = cart.length;

  const onQuantityClick = (item: CartItem, event: React.MouseEvent) => {
    setQuantityEditItem(item);
    dialogHandlers.onToggleKeypad();
  };

  const BillIcon = ({ denomination }: { denomination: keyof BillDenominations }) => (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => transactionHandlers.handleBillChange(denomination, bills[denomination] + 1)}
        onContextMenu={(e) => {
          e.preventDefault();
          transactionHandlers.handleBillChange(denomination, Math.max(bills[denomination] - 1, 0));
        }}
        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        <span className="text-lg font-bold">{denomination} دج</span>
      </button>
      {bills[denomination] > 0 && (
        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full px-1">
          {bills[denomination]}
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full lg:w-[35%] h-screen bg-gray-50 border-r flex flex-col p-4">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingCart className="ml-2" />
          <span>السلة</span>
          {totalItems > 0 && (
            <div className="flex gap-2 mr-2">
              <span className="text-white text-sm px-2 py-1 rounded-full" style={{ backgroundColor: customColor.base }}>
                {uniqueProducts} منتج
              </span>
              <span className="text-white text-sm px-2 py-1 rounded-full" style={{ backgroundColor: customColor.base }}>
                {totalItems} قطعة
              </span>
            </div>
          )}
        </h2>
        <button onClick={cartOperations.clearCart} className="text-red-500 hover:text-red-700">
          <Trash2 />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto mb-4 border rounded-lg bg-white">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ShoppingCart size={64} className="mb-4 opacity-50" />
            <p className="text-xl font-medium">السلة فارغة</p>
            <p className="text-sm">لم يتم إضافة أي منتج بعد</p>
          </div>
        ) : (
          // Cart Items List
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50">
                {/* Item Details */}
                <div className="flex flex-col ml-2">
                  <span className="text-base font-medium">{item.arabicName}</span>
                  <span className="text-sm text-gray-500">
                    {item.priceType === "weight"
                      ? `${(item.modifiedPrice ?? item.price).toFixed(2)} دج/${item.unit}`
                      : `${(item.modifiedPrice ?? item.price).toFixed(2)} دج`}
                    {item.modifiedPrice && (
                      <span className="line-through text-xs mr-1 text-gray-400">
                        {item.price.toFixed(2)} دج
                      </span>
                    )}
                  </span>
                  {item.priceType === "weight" && (
                    <span className="text-sm text-gray-500">
                      {item.weight} {item.unit}
                    </span>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold ml-2" style={{ color: customColor.base }}>
                    {item.priceType === "weight"
                      ? ((item.modifiedPrice ?? item.price) * (item.weight || 0)).toFixed(2)
                      : ((item.modifiedPrice ?? item.price) * item.quantity).toFixed(2)}{" "}
                    دج
                  </span>

                  <button
                    onClick={() => dialogHandlers.openPriceModifyDialog(item)}
                    className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    title="تعديل السعر"
                  >
                    <Edit2 size={16} />
                  </button>

                  {item.priceType === "weight" ? (
                    <button
                      onClick={() => dialogHandlers.openWeightDialog(item)}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      تعديل الوزن
                    </button>
                  ) : (
                    <div className="flex items-center bg-gray-100 rounded-lg h-8">
                      <button
                        onClick={() => cartOperations.updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 h-full rounded-r-lg hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          cartOperations.updateQuantity(item.id, value);
                        }}
                        onClick={(e) => onQuantityClick(item, e)}
                        className="w-12 text-center bg-transparent"
                      />
                      <button
                        onClick={() => cartOperations.updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 h-full rounded-l-lg hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => cartOperations.removeFromCart(item.id)}
                    className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Section */}
      <div className="flex-shrink-0 pt-2 border-t space-y-4">
        <div className="flex justify-between font-bold">
          <span>المجموع الفرعي:</span>
          <span>{transactionStats.subtotal.toFixed(2)} دج</span>
        </div>

        {discount && (
          <div className="flex justify-between text-green-600">
            <span>الخصم:</span>
            <span>
              {discount.type === 'percentage' 
                ? `${discount.value}%` 
                : `${discount.value.toFixed(2)} دج`}
            </span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي:</span>
          <span>{transactionStats.total.toFixed(2)} دج</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="المبلغ النقدي"
              value={customerCash}
              onChange={(e) => transactionHandlers.setCustomerCash(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={dialogHandlers.onToggleKeypad}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <CreditCard />
            </button>
          </div>

          {showKeypad && (
            <div className="p-2 bg-white rounded-lg border">
              <NumericKeypad
                onNumberClick={dialogHandlers.onKeypadNumberClick}
                onClear={dialogHandlers.onKeypadClear}
                onSubmit={transactionHandlers.processTransaction}
              />
            </div>
          )}

          {/* Bills Section */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(bills).map((denomination) => (
              <BillIcon key={denomination} denomination={denomination as unknown as keyof BillDenominations} />
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>{transactionStats.change.toFixed(2)} دج</span>
            <span>المتبقي:</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={transactionHandlers.processTransaction}
              disabled={cart.length === 0 || !customerCash}
              className="p-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              إتمام المعاملة (F4)
            </button>
            <button
              onClick={dialogHandlers.onPrintReceipt}
              disabled={cart.length === 0}
              className="p-3 text-white rounded hover:opacity-90 disabled:bg-gray-400"
              style={{ backgroundColor: customColor.base }}
            >
              طباعة الإيصال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
