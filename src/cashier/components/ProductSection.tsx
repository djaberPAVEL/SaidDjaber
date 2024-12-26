import React from 'react';
import { Search, Info } from 'lucide-react';
import { Product, Category, CartItem, DialogHandlers } from '../types/pos.types';
import { themeColors } from '../theme/colors';

interface ProductSectionProps {
  categories: Category[];
  selectedCategory: string;
  searchTerm: string;
  stateHandlers: {
    setSelectedCategory: (category: string) => void;
    setSearchTerm: (term: string) => void;
  };
  products: Product[];
  cart: CartItem[];
  cartOperations: {
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
  };
  dialogHandlers: Pick<DialogHandlers, 'openProductDetails'>;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  categories,
  selectedCategory,
  searchTerm,
  stateHandlers,
  products,
  cart,
  cartOperations,
  dialogHandlers,
}) => {
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchTerm
        ? product.arabicName.includes(searchTerm) ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.barcode?.includes(searchTerm)
        : true)
  );

  const ProductCard: React.FC<ProductCardProps> = ({
    product,
    cartItem,
    onAddToCart,
    onProductDetails,
  }) => (
    <div className="flex flex-col">
      <div className="relative h-32 rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute bottom-0 right-0 p-2 text-white">
            <div className="text-lg font-bold">{product.arabicName}</div>
            <div className="text-sm">
              {product.price.toFixed(2)} دج
              {product.priceType === "weight" && " / كغ"}
            </div>
          </div>

          <div className="absolute top-1 left-1 text-xs bg-white text-gray-800 px-2 py-1 rounded-full">
            {product.priceType === "weight" ? "بالوزن" : `${product.stock} متبقي`}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onProductDetails(product);
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
          {cartItem.quantity} 
          {cartItem.weight ? ` (${cartItem.weight} كغ)` : ''} في السلة
        </div>
      )}
    </div>
  );
  
  return (
    <div className="flex-1 bg-white shadow-md flex flex-col p-4 overflow-hidden">
      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 flex-shrink-0">
        <button
          onClick={() => stateHandlers.setSelectedCategory("")}
          className={`px-4 py-2 rounded ${
            !selectedCategory ? "text-white" : "bg-gray-200"
          }`}
          style={{
            backgroundColor: !selectedCategory
              ? themeColors.primary.base
              : undefined,
          }}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => stateHandlers.setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat.id ? "text-white" : "bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedCategory === cat.id
                  ? themeColors.primary.base
                  : undefined,
            }}
          >
            {cat.arabicName}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex mb-4 flex-shrink-0">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="البحث عن المنتجات..."
            value={searchTerm}
            onChange={(e) => stateHandlers.setSearchTerm(e.target.value)}
            className="w-full p-2 pr-8 border rounded text-right"
          />
          <Search className="absolute right-2 top-3 text-gray-400" size={18} />
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 h-full overflow-y-auto p-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cart.find(item => item.id === product.id)}
              onAddToCart={cartOperations.addToCart}
              onProductDetails={dialogHandlers.openProductDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onProductDetails: (product: Product) => void;
}

export default ProductSection;
