// 1. Third-party imports
import React, { useState, useEffect, useMemo } from "react";
import Split from "react-split"; // Add this import
import "@fontsource/cairo/400.css"; // Regular weight
import "@fontsource/cairo/700.css"; // Bold weight
// 2. Icons
import { Search, Info } from "lucide-react";
// 3. Local imports
import NumericKeypad from "./NumericKeypad"; // Adjust the import path as necessary
import { initialProducts } from "./data/products";
import { initialCategories } from "./data/categoriesP";
// src/cashier/POSCashierScreen.tsx

import {
  Product,
  CartItem,
  Discount,
  Category,
} from "../cashier/types/pos.types";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";
import { PriceModificationDialog } from "./components/PriceModificationDialog";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { WeightDialog } from "./components/WeightDialog";
import { CartSection } from "./components/CartSection";
import { printReceipt } from "./utils/receiptPrinting";
import { useDialogState } from "./hooks/useDialogState";
import { BILL_DENOMINATIONS, BillDenominations } from "./constants/bills";
import { themeColors } from "./theme/colors";
import { useCart } from "./hooks/useCart";
import { TotalDisplay } from './components/TotalDisplay';
import ProductSection from './components/ProductSection';

// POSCashierScreen is the main component for the cashier interface, handling product selection, cart management, and transaction processing.
const POSCashierScreen: React.FC = () => {
  // Replace cart state and functions with useCart hook
  const {
    cart,
    setCart,
    addToCart: baseAddToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartStats,
  } = useCart();

  // Keep other state declarations
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customerCash, setCustomerCash] = useState<string>("");
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [newPriceInput, setNewPriceInput] = useState("");

  // UI control state
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadPosition, setKeypadPosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  // Dialog states
  const { dialogState, dialogHandlers } = useDialogState();
  const {
    openWeightDialog,
    closeWeightDialog,
    openPriceModifyDialog,
    closePriceModifyDialog,
    openProductDetails,
    closeProductDetails,
  } = dialogHandlers;

  

  const [showQuantityKeypad, setShowQuantityKeypad] = useState(false);
  const [quantityKeypadItem, setQuantityKeypadItem] = useState<CartItem | null>(
    null
  );
  const [quantityInput, setQuantityInput] = useState("");

  // Bills management
  const [bills, setBills] = useState<BillDenominations>({
    2000: 0,
    1000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
  });

  // Memoized calculations
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.modifiedPrice ?? item.price;
      return (
        total +
        price * (item.priceType === "weight" ? item.weight || 0 : item.quantity)
      );
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

  // Modify addToCart to handle weight products
  const addToCart = (product: Product) => {
    if (product.priceType === "weight") {
      openWeightDialog(product);
      return;
    }
    baseAddToCart(product);
  };

  // Event handlers
  useKeyboardEvents({
    showQuantityKeypad,
    quantityKeypadItem,
    handleQuantityConfirm: () => {
      /* ...existing code... */
    },
    setShowQuantityKeypad,
    setQuantityKeypadItem,
    setQuantityInput,
  });

  // Filter products
  // Removed duplicate declaration of filteredProducts

  // Add this state for keypad position
  const handleBillChange = (denomination: number, count: number) => {
    setBills((prevBills) => ({
      ...prevBills,
      [denomination]: count,
    }));
  };

  const calculateTotalCash = () => {
    return Object.entries(bills).reduce(
      (total, [denomination, count]) => total + parseInt(denomination) * count,
      0
    );
  };

  useEffect(() => {
    setCustomerCash(calculateTotalCash().toString());
  }, [bills]);

  // Replace the existing modifyItemPrice function with this new one
  const modifyItemPrice = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    openPriceModifyDialog(item);
  };

  const handleQuantityConfirm = () => {
    if (quantityKeypadItem) {
      const newQuantity = parseInt(quantityInput, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        updateQuantity(quantityKeypadItem.id, newQuantity);
      }
    }
    setShowQuantityKeypad(false);
    setQuantityKeypadItem(null);
    setQuantityInput("");
  };

  // Search and Filter Functions
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (selectedCategory ? product.category === selectedCategory : true) &&
        (searchTerm
          ? product.arabicName.includes(searchTerm) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.barcode?.includes(searchTerm)
          : true)
    );
  }, [products, searchTerm, selectedCategory]);

  // Transaction Functions
  const processTransaction = () => {
    if (parseFloat(customerCash) >= total) {
      alert(`اكتمل الدفع! المبلغ المتبقي: ${change.toFixed(2)} د.ج`);

      // Reset transaction
      setCart([]);
      setCustomerCash("");
      setDiscount(null);
    } else {
      alert("النقود غير كافية");
    }
  };
  const handleKeyPress = (value: string) => {
    setCustomerCash((prev) => prev + value);
  };

  const handleClear = () => {
    setCustomerCash("");
  };

  const handlePrintReceipt = () => {
    printReceipt({
      cart,
      subtotal,
      discount,
      total,
      customerCash,
      change,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") setShowKeypad((prev) => !prev);
      if (e.key === "F4") processTransaction();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleWeightConfirm = (weight: number) => {
    if (!dialogState.weightDialogProduct) return;
    const existingItem = dialogState.weightDialogProduct
      ? cart.find((item) => item.id === dialogState.weightDialogProduct?.id)
      : null;
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === dialogState.weightDialogProduct?.id
            ? { ...item, weight }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...dialogState.weightDialogProduct, quantity: 1, weight },
      ]);
    }
    closeWeightDialog();
  };

  // Add this new component inside POSCashierScreen
  const handlePriceModification = (
    newPrice: number,
    isPermanent: boolean
  ) => {
    if (!dialogState.priceModifyItem) return;
    const itemId = dialogState.priceModifyItem.id;

    if (isPermanent) {
      // Update the product in the products list
      setProducts(
        products.map((product) =>
          product.id === itemId ? { ...product, price: newPrice } : product
        )
      );

      // Update the cart item
      setCart(
        cart.map((item) =>
          item.id === itemId
            ? { ...item, price: newPrice, modifiedPrice: undefined }
            : item
        )
      );
    } else {
      // Temporary modification
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, modifiedPrice: newPrice } : item
        )
      );
    }

    closePriceModifyDialog();
  };

  // Modify the quantity click handler
  const handleQuantityClick = (product: Product, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setKeypadPosition({
      x: rect.right + 100, // 10px gap from the input
      y: rect.top, // Align with top of input
    });
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem) {
      setQuantityKeypadItem(cartItem);
    }
    setShowQuantityKeypad(true);
  };

  const handlers = {
    dialog: {
      onToggleKeypad: () => setShowKeypad(prev => !prev),
      closeWeightDialog,
      closePriceModifyDialog,
      closeProductDetails
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
      }
    },
    cart: {
      addToCart,
      updateQuantity: (productId: string, quantity: number, weight?: number) => {
        if (quantity <= 0) {
          removeFromCart(productId);
          return;
        }
        updateQuantity(productId, quantity, weight);
      },
      removeFromCart,
      clearCart,
      setDiscount,
      modifyPrice: (itemId: string, newPrice: number) => {
        setCart(
          cart.map((item) =>
            item.id === itemId ? { ...item, modifiedPrice: newPrice } : item
          )
        );
      }
    }
  };

  useKeyboardEvents({
    showQuantityKeypad,
    quantityKeypadItem,
    handleQuantityConfirm,
    setShowQuantityKeypad,
    setQuantityKeypadItem,
    setQuantityInput,
    onF2Press: handlers.dialog.onToggleKeypad,
    onF4Press: handlers.transaction.process,
    onEscapePress: () => {
      handlers.dialog.closeWeightDialog();
      handlers.dialog.closePriceModifyDialog();
      handlers.dialog.closeProductDetails();
    }
  });

  const transactionStats = {
    subtotal,
    total,
    change,
  };

  const transactionHandlers = {
    handleBillChange,
    processTransaction,
    setCustomerCash,
    clearCustomerCash: handleClear,
    resetBills: () => setBills({
      2000: 0, 1000: 0, 500: 0, 200: 0,
      100: 0, 50: 0, 20: 0, 10: 0, 5: 0
    })
  };

  // Cart section props
  const cartOperations = {
    addToCart,
    updateQuantity: handlers.cart.updateQuantity,
    removeFromCart: handlers.cart.removeFromCart,
    clearCart: handlers.cart.clearCart,
    setDiscount: handlers.cart.setDiscount
  };

  // Merge state handlers for ProductSection
  const productSectionHandlers = {
    setSelectedCategory,
    setSearchTerm
  };

  // Cart operations for ProductSection
  const productSectionCartOps = {
    addToCart,
    updateQuantity: handlers.cart.updateQuantity,
    removeFromCart
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-gray-100 rtl overflow-hidden"
      dir="rtl"
    >
      <Split
        className="flex flex-col lg:flex-row w-full h-full"
        sizes={[65, 35]}
        minSize={200}
        gutterSize={10}
        direction="horizontal"
      >
        <div className="w-full lg:w-[65%] h-screen flex flex-col">
          <Split
            className="flex flex-col w-full h-full"
            sizes={[20, 80]}
            minSize={100}
            gutterSize={10}
            direction="vertical"
          >
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
              stateHandlers={productSectionHandlers}
              products={products}
              cart={cart}
              cartOperations={productSectionCartOps}
              dialogHandlers={{
                ...dialogHandlers,
                onPrintReceipt: handlePrintReceipt,
                onKeypadNumberClick: handleKeyPress,
                onKeypadClear: handleClear
              }}
            />
          </Split>
        </div>

        {/* Cart and Checkout Section */}
        <CartSection
          cart={cart}
          discount={discount}
          transactionStats={transactionStats}
          bills={bills}
          customerCash={customerCash}
          showKeypad={showKeypad}
          cartOperations={cartOperations}
          transactionHandlers={transactionHandlers}
          dialogHandlers={{
            ...dialogHandlers,
            onKeypadNumberClick: handleKeyPress,
            onKeypadClear: handleClear,
            onPrintReceipt: handlePrintReceipt
          }}
        />
      </Split>
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
      {showQuantityKeypad && (
        <NumericKeypad
          onNumberClick={(num) => setQuantityInput((prev) => prev + num)}
          onClear={() => setQuantityInput("")}
          onSubmit={handleQuantityConfirm}
          position={keypadPosition}
        />
      )}
    </div>
  );
};

export default POSCashierScreen;
