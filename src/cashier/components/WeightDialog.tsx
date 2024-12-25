import { useState } from 'react';
import { Product } from '../types/pos.types';

interface WeightDialogProps {
  product: Product;
  onConfirm: (weight: number) => void;
  onClose: () => void;
}

export const WeightDialog = ({ product, onConfirm, onClose }: WeightDialogProps) => {
  const [weightInput, setWeightInput] = useState("");
  const [weightInputType, setWeightInputType] = useState<"weight" | "total">("weight");

  const weight = parseFloat(weightInput) || 0;
  const total = weightInputType === "weight" 
    ? weight * product.price 
    : parseFloat(weightInput) || 0;
  const calculatedWeight = weightInputType === "total" 
    ? total / product.price 
    : weight;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full" dir="rtl">
        <h3 className="text-xl font-bold mb-4">{product.arabicName}</h3>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setWeightInputType("weight");
              setWeightInput("");
            }}
            className={`flex-1 p-2 rounded ${
              weightInputType === "weight" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            إدخال الوزن
          </button>
          <button
            onClick={() => {
              setWeightInputType("total");
              setWeightInput("");
            }}
            className={`flex-1 p-2 rounded ${
              weightInputType === "total" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            إدخال المبلغ
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {weightInputType === "weight" 
                ? `أدخل الوزن (${product.unit})` 
                : "أدخل المبلغ (دج)"}
            </label>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-full p-2 border rounded"
              autoFocus
            />
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between mb-2">
              <span>السعر للوحدة:</span>
              <span>{product.price} دج/{product.unit}</span>
            </div>
            <div className="flex justify-between font-bold">
              {weightInputType === "weight" ? (
                <>
                  <span>المجموع:</span>
                  <span>{total.toFixed(2)} دج</span>
                </>
              ) : (
                <>
                  <span>الوزن:</span>
                  <span>{calculatedWeight.toFixed(3)} {product.unit}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onConfirm(calculatedWeight)}
              disabled={calculatedWeight <= 0}
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
