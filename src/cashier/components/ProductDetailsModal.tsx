
import { Product, Category } from '../types/pos.types';

interface ProductDetailsModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
}

export const ProductDetailsModal = ({ product, categories, onClose }: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{product.arabicName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="space-y-2">
          <p>
            <span className="font-bold">السعر:</span> {product.price} دج
          </p>
          <p>
            <span className="font-bold">الباركود:</span> {product.barcode}
          </p>
          <p>
            <span className="font-bold">المخزون المتبقي:</span>{" "}
            {product.stock} قطعة
          </p>
          <p>
            <span className="font-bold">الفئة:</span>{" "}
            {categories.find((c) => c.id === product.category)?.arabicName}
          </p>
        </div>
      </div>
    </div>
  );
};
