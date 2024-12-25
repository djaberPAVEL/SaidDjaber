import React from 'react';
import { CartItem, DialogHandlers, DialogState, Category, CartOperations } from '../types/pos.types';
import POSDialog from './POSDialog';
import { WeightDialog } from './WeightDialog';
import { PriceModificationDialog } from './PriceModificationDialog';
import { ProductDetailsModal } from './ProductDetailsModal';

interface DialogManagerProps {
  dialogState: DialogState;
  dialogHandlers: DialogHandlers;
  cartOperations: CartOperations;
  categories: Category[];
}

export const DialogManager: React.FC<DialogManagerProps> = ({
  dialogState,
  dialogHandlers,
  cartOperations,
  categories,
}) => {
  const handleWeightConfirm = (weight: number) => {
    if (!dialogState.weightDialogProduct) return;
    cartOperations.updateQuantity(
      dialogState.weightDialogProduct.id,
      1,
      weight
    );
    dialogHandlers.closeWeightDialog();
  };

  const handlePriceModification = (newPrice: number, isPermanent: boolean) => {
    if (!dialogState.priceModifyItem || !cartOperations.updatePrice) return;
    cartOperations.updatePrice(
      dialogState.priceModifyItem.id,
      newPrice,
      isPermanent
    );
    dialogHandlers.closePriceModifyDialog();
  };

  return (
    <>
      {/* Weight Dialog */}
      {dialogState.showWeightDialog && dialogState.weightDialogProduct && (
        <POSDialog
          open={dialogState.showWeightDialog}
          onClose={dialogHandlers.closeWeightDialog}
          title="تعديل الوزن"
        >
          <WeightDialog
            product={dialogState.weightDialogProduct}
            onConfirm={handleWeightConfirm}
            onClose={dialogHandlers.closeWeightDialog}
          />
        </POSDialog>
      )}

      {/* Price Modification Dialog */}
      {dialogState.showPriceModifyDialog && dialogState.priceModifyItem && (
        <POSDialog
          open={dialogState.showPriceModifyDialog}
          onClose={dialogHandlers.closePriceModifyDialog}
          title="تعديل السعر"
        >
          <PriceModificationDialog
            item={dialogState.priceModifyItem}
            onConfirm={(newPrice: number, isPermanent: boolean) => handlePriceModification(newPrice, isPermanent)}
            onClose={dialogHandlers.closePriceModifyDialog}
            newPrice={dialogState.newPriceInput}
          />
        </POSDialog>
      )}

      {/* Product Details Dialog */}
      {dialogState.showProductDetails && dialogState.selectedProduct && (
        <POSDialog
          open={dialogState.showProductDetails}
          onClose={dialogHandlers.closeProductDetails}
          title="تفاصيل المنتج"
        >
          <ProductDetailsModal
            product={dialogState.selectedProduct}
            categories={categories}
            onClose={dialogHandlers.closeProductDetails}
          />
        </POSDialog>
      )}
    </>
  );
};
