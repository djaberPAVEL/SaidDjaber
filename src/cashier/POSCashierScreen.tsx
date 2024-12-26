import React, { useState, useEffect, useMemo } from "react";
import Split from "react-split";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";

// Local imports
import { Product, CartItem, Discount, Category } from "../cashier/types/pos.types";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";
import { PriceModificationDialog } from "./components/PriceModificationDialog";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { WeightDialog } from "./components/WeightDialog";
import { CartSection } from "./components/CartSection";
import { printReceipt } from "./utils/receiptPrinting";
import { useDialogState } from "./hooks/useDialogState";
import { BillDenominations } from "./constants/bills";
import { themeColors } from "./theme/colors";
import { useCart } from "./hooks/useCart";
import { TotalDisplay } from './components/TotalDisplay';
import ProductSection from './components/ProductSection';
import { initialProducts } from "./data/products";
import { initialCategories } from "./data/categoriesP";

const POSCashierScreen: React.FC = () => {
  // Cart state
  const {
    cart,
    setCart,
    addToCart: baseAddToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Basic state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customerCash, setCustomerCash] = useState<string>("");
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [showKeypad, setShowKeypad] = useState(false);

  // Dialog state
  const { dialogState, dialogHandlers } = useDialogState();
  const {
    openWeightDialog,
    closeWeightDialog,
    openPriceModifyDialog,
    closePriceModifyDialog,
    openProductDetails,
    closeProductDetails,
  } = dialogHandlers;

  // Bills state
  const [bills, setBills] = useState<BillDenominations>({
    2000: 0, 1000: 0, 500: 0, 200: 0,
    100: 0, 50: 0, 20: 0, 10: 0, 5: 0
  });

  // Memoized calculations
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

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.priceType === "weight") {
      openWeightDialog(product);
      return;
    }
    baseAddToCart(product);
  };

  // Event handlers
  const handleWeightConfirm = (weight: number) => {
    if (!dialogState.weightDialogProduct) return;
    const product = dialogState.weightDialogProduct;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, weight } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, weight }];
    });
    
    closeWeightDialog();
  };

  const handlePriceModification = (newPrice: number, isPermanent: boolean) => {
    if (!dialogState.priceModifyItem) return;
    const itemId = dialogState.priceModifyItem.id;

    if (isPermanent) {
      setProducts(products => products.map(product =>
        product.id === itemId ? { ...product, price: newPrice } : product
      ));
      setCart(cart => cart.map(item =>
        item.id === itemId ? { ...item, price: newPrice, modifiedPrice: undefined } : item
      ));
    } else {
      setCart(cart => cart.map(item =>
        item.id === itemId ? { ...item, modifiedPrice: newPrice } : item
      ));
    }

    closePriceModifyDialog();
  };

  // Combined handlers
  const handlers = {
    cash: {
      handlePress: (value: string) => setCustomerCash(prev => prev + value),
      handleClear: () => setCustomerCash(""),
      handleBillChange: (denomination: number, count: number) => {
        setBills(prev => ({ ...prev, [denomination]: count }));
      }
    },
    transaction: {
      process: () => {
        if (parseFloat(customerCash) >= total) {
          alert(`اكتمل الدفع! المبلغ المتبقي: ${change.toFixed(2)} د.ج`);
          setCart([]);
          setCustomerCash("");
          setDiscount(null);
        } else {
          alert("النقود غير كافية");
        }
      },
      print: () => printReceipt({ cart, subtotal, discount, total, customerCash, change })
    }
  };

  // Use effects
  useEffect(() => {
    const totalCash = Object.entries(bills)
      .reduce((sum, [denom, count]) => sum + parseInt(denom) * count, 0);
    setCustomerCash(totalCash.toString());
  }, [bills]);

  useKeyboardEvents({
    onF2Press: () => setShowKeypad(prev => !prev),
    onF4Press: handlers.transaction.process,
    onEscapePress: () => {
      closeWeightDialog();
      closePriceModifyDialog();
      closeProductDetails();
    }
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 rtl overflow-hidden" dir="rtl">
      <Split className="flex flex-col lg:flex-row w-full h-full" sizes={[65, 35]} minSize={200} gutterSize={10} direction="horizontal">
        <div className="w-full lg:w-[65%] h-screen flex flex-col">
          <Split className="flex flex-col w-full h-full" sizes={[20, 80]} minSize={100} gutterSize={10} direction="vertical">
            <TotalDisplay
              total={total}
              customerCash={customerCash}
              change={change}
              colors={themeColors.primary}
            />

            <ProductSection
              categories={categories}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              stateHandlers={{
                setSelectedCategory: setSelectedCategory,
                setSearchTerm: setSearchTerm
              }}
              products={products}
              cart={cart}
              cartOperations={{
                addToCart,
                updateQuantity: (productId: string, quantity: number) => updateQuantity(productId, quantity),
                removeFromCart: (productId: string) => removeFromCart(productId)
              }}
              dialogHandlers={{
                ...dialogHandlers,
                openProductDetails: (product: Product) => dialogHandlers.openProductDetails(product)
              }}
            />
          </Split>
        </div>

        <CartSection
          cart={cart}
          discount={discount}
          transactionStats={{ subtotal, total, change }}
          bills={bills}
          customerCash={customerCash}
          showKeypad={showKeypad}
          cartOperations={{
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            setDiscount
          }}
          transactionHandlers={{
            handleBillChange: handlers.cash.handleBillChange,
            processTransaction: handlers.transaction.process,
            setCustomerCash,
            clearCustomerCash: handlers.cash.handleClear,
            resetBills: () => setBills({
              2000: 0, 1000: 0, 500: 0, 200: 0,
              100: 0, 50: 0, 20: 0, 10: 0, 5: 0
            })
          }}
          dialogHandlers={{
            ...dialogHandlers,
            onKeypadNumberClick: handlers.cash.handlePress,
            onKeypadClear: handlers.cash.handleClear,
            onPrintReceipt: handlers.transaction.print
          }}
        />
      </Split>

      {/* Dialogs */}
      {dialogState.showProductDetails && (
        <ProductDetailsModal
          product={dialogState.selectedProduct}
          categories={categories}
          onClose={closeProductDetails}
        />
      )}
      {dialogState.showWeightDialog && dialogState.weightDialogProduct && (
        <WeightDialog
          product={dialogState.weightDialogProduct}
          onConfirm={handleWeightConfirm}
          onClose={closeWeightDialog}
        />
      )}
      {dialogState.showPriceModifyDialog && dialogState.priceModifyItem && (
        <PriceModificationDialog
          item={dialogState.priceModifyItem}
          onConfirm={handlePriceModification}
          onClose={closePriceModifyDialog}
          newPrice={dialogState.newPriceInput}
        />
      )}
    </div>
  );
};

export default POSCashierScreen;
