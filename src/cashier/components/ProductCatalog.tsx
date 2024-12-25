import { Search } from 'lucide-react';
import { Product, Category } from '../pos.types';
import { ProductCard } from '../ProductCard';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchTerm: string;
  onCategorySelect: (categoryId: string) => void;
  onSearch: (term: string) => void;
  onAddToCart: (product: Product) => void;
  onShowDetails: (product: Product) => void;
  customColor: {
    bg: string;
    bgDarker: string;
    bgLighter: string;
  };
}

export const ProductCatalog = ({
  products,
  categories,
  selectedCategory,
  searchTerm,
  onCategorySelect,
  onSearch,
  onAddToCart,
  onShowDetails,
  customColor
}: ProductCatalogProps) => {
  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    (searchTerm
      ? product.arabicName.includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode?.includes(searchTerm)
      : true)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => onCategorySelect("")}
          className={`px-4 py-2 rounded ${
            !selectedCategory ? "text-white" : "bg-gray-200"
          }`}
          style={{
            backgroundColor: !selectedCategory ? customColor.bg : undefined,
          }}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat.id ? "text-white" : "bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedCategory === cat.id ? customColor.bg : undefined,
            }}
          >
            {cat.arabicName}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="البحث عن المنتجات..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 pr-8 border rounded text-right"
        />
        <Search className="absolute right-2 top-3 text-gray-400" size={18} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto p-2">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onShowDetails={onShowDetails}
          />
        ))}
      </div>
    </div>
  );
};
