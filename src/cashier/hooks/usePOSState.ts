import { useState } from 'react';
import { initialProducts } from "../data/products";
import { initialCategories } from "../data/categoriesP";
import { Product, Category } from "../types/pos.types";

export const usePOSState = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const stateHandlers = {
    setSelectedCategory,
    setSearchTerm,
    updateProduct: (productId: string, updates: Partial<Product>) => {
      setProducts(products.map(p => 
        p.id === productId ? { ...p, ...updates } : p
      ));
    }
  };

  return {
    products,
    categories,
    selectedCategory,
    searchTerm,
    stateHandlers
  };
};
