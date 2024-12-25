import React from 'react';
import { Info } from 'lucide-react';
import { Product } from '../types/pos.types';
import { ProductCard } from '../ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductDetails: (product: Product) => void;
  cart: Array<{ id: string; quantity: number }>;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onProductDetails,
  cart
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 h-full overflow-y-auto p-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onShowDetails={onProductDetails}
          onProductDetails={onProductDetails}
          quantity={cart.find(item => item.id === product.id)?.quantity}
        />
      ))}
    </div>
  );
};
