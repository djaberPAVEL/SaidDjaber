import React from 'react';
import { Info } from 'lucide-react';
import { Product, CartItem } from './types/pos.types';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onShowDetails: (product: Product) => void;
  onProductDetails: (product: Product) => void;
  quantity?: number;

}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartItem,
  onAddToCart,
  
  
  onShowDetails
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-32 rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-full">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute bottom-0 right-0 p-2 text-white">
            <div className="text-lg font-bold">{product.arabicName}</div>
            <div className="text-sm">{product.price.toFixed(2)} دج</div>
          </div>

          <div className="absolute top-1 left-1 text-xs bg-white text-gray-800 px-2 py-1 rounded-full">
            {product.stock} متبقي
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShowDetails(product);
            }}
            className="absolute top-1 right-1 p-1.5 bg-white rounded-full hover:bg-gray-100 z-20"
          >
            <Info size={16} />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className="absolute inset-0 z-10"
          />
        </div>
      </div>

      {cartItem && (
        <div className="text-center text-sm py-1 px-2 bg-gray-100 rounded-full mt-1">
          {cartItem.quantity} في السلة
        </div>
      )}
    </div>
  );
};
