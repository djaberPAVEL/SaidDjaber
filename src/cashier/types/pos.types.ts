// src/types/pos.types.ts

export interface Product {
    id: string;
    name: string;
    arabicName: string;
    price: number;
    barcode?: string;
    category?: string;
    stock: number;
    imageUrl: string;
    priceType: "unit" | "weight";
    unit?: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
    weight?: number;
    modifiedPrice?: number;
  }
  
  export interface Discount {
    type: "percentage" | "fixed";
    value: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    arabicName: string;
  }

  export interface DialogState {
    showWeightDialog: boolean;
    weightDialogProduct: Product | null;
    showPriceModifyDialog: boolean;
    priceModifyItem: CartItem | null;
    showProductDetails: boolean;
    selectedProduct: Product | null;
    newPriceInput: string;
    showDialogs: boolean;
    showKeypad: boolean;
  }

  export interface DialogHandlers {
    openWeightDialog: (product: Product | CartItem) => void;
    closeWeightDialog: () => void;
    openPriceModifyDialog: (item: CartItem) => void;
    closePriceModifyDialog: () => void;
    openProductDetails: (product: Product) => void;
    closeProductDetails: () => void;
    onPrintReceipt: () => void;
    onToggleKeypad: () => void;
    onKeypadNumberClick: (value: string) => void;
    onKeypadClear: () => void;
  }

  export interface TransactionStats {
    subtotal: number;
    total: number;
    change: number;
  }

  export interface CartOperations {
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, quantity: number, weight?: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updatePrice?: (productId: string, newPrice: number, isPermanent: boolean) => void;
  }