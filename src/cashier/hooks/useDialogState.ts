import { useState } from 'react';
import { Product, CartItem } from '../types/pos.types';

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
  openWeightDialog: (product: Product) => void;
  closeWeightDialog: () => void;
  openPriceModifyDialog: (item: CartItem) => void;
  closePriceModifyDialog: () => void;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;
  onToggleKeypad: () => void;
  onKeypadNumberClick?: (value: string) => void;
  onKeypadClear?: () => void;
  onPrintReceipt?: () => void;
}

export const useDialogState = () => {
  const [dialogState, setDialogState] = useState<DialogState>({
    showWeightDialog: false,
    weightDialogProduct: null,
    showPriceModifyDialog: false,
    priceModifyItem: null,
    showProductDetails: false,
    selectedProduct: null,
    newPriceInput: '',
    showDialogs: false,
    showKeypad: false,
  });

  const openWeightDialog = (product: Product) => {
    setDialogState(prev => ({
      ...prev,
      showWeightDialog: true,
      weightDialogProduct: product,
    }));
  };

  const closeWeightDialog = () => {
    setDialogState(prev => ({
      ...prev,
      showWeightDialog: false,
      weightDialogProduct: null,
    }));
  };

  const openPriceModifyDialog = (item: CartItem) => {
    setDialogState(prev => ({
      ...prev,
      showPriceModifyDialog: true,
      priceModifyItem: item,
      newPriceInput: (item.modifiedPrice ?? item.price).toString(),
    }));
  };

  const closePriceModifyDialog = () => {
    setDialogState(prev => ({
      ...prev,
      showPriceModifyDialog: false,
      priceModifyItem: null,
      newPriceInput: '',
    }));
  };

  const openProductDetails = (product: Product) => {
    setDialogState(prev => ({
      ...prev,
      showProductDetails: true,
      selectedProduct: product,
    }));
  };

  const closeProductDetails = () => {
    setDialogState(prev => ({
      ...prev,
      showProductDetails: false,
      selectedProduct: null,
    }));
  };

  const dialogHandlers: DialogHandlers = {
    openWeightDialog,
    closeWeightDialog,
    openPriceModifyDialog,
    closePriceModifyDialog,
    openProductDetails,
    closeProductDetails,
    onToggleKeypad: () => {
      setDialogState(prev => ({ ...prev, showKeypad: !prev.showKeypad }));
    },
    onKeypadNumberClick: (value: string) => {
      setDialogState(prev => ({
        ...prev,
        newPriceInput: prev.newPriceInput + value
      }));
    },
    onKeypadClear: () => {
      setDialogState(prev => ({
        ...prev,
        newPriceInput: ''
      }));
    },
    onPrintReceipt: () => {
      // Implement print receipt logic here
      console.log('Printing receipt...');
    }
  };

  return {
    dialogState,
    dialogHandlers,
    setDialogState
  };
};
