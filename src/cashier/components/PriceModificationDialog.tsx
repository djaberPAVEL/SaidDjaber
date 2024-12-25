import { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { CartItem } from '../types/pos.types';

interface PriceModificationDialogProps {
  item: CartItem;
  onConfirm: (newPrice: number, isPermanent: boolean) => void;
  onClose: () => void;
  newPrice: string;
}

export const PriceModificationDialog: React.FC<PriceModificationDialogProps> = ({
  item,
  onConfirm,
  onClose,
  newPrice: initialPrice
}) => {
  const [newPrice, setNewPrice] = useState(initialPrice);
  const [isPermanent, setIsPermanent] = useState(false);

  const handleConfirm = () => {
    const price = parseFloat(newPrice);
    if (!isNaN(price) && price >= 0) {
      onConfirm(price, isPermanent);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full" dir="rtl">
        <h3 className="text-xl font-bold mb-4">
          تعديل السعر - {item.arabicName}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">السعر الحالي</label>
            <div className="text-lg font-bold text-gray-600">
              {item.price} دج
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">السعر الجديد</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full p-2 border rounded"
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="modificationType"
                checked={!isPermanent}
                onChange={() => setIsPermanent(false)}
              />
              <Clock size={18} />
              <span>تعديل مؤقت</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="modificationType"
                checked={isPermanent}
                onChange={() => setIsPermanent(true)}
              />
              <Save size={18} />
              <span>تعديل دائم</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={newPrice === '' || isNaN(parseFloat(newPrice))}
              className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              تأكيد
            </button>
            <button
              onClick={onClose}
              className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
