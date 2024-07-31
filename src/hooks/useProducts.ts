import { useEffect, useState } from "react";
import productService , { Product } from "../services/product-service";
import { CanceledError } from "../services/api-client";

const useProducts = ()=>{

    const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = productService.getAll<Product>();
    request
      .then((res) => {
        const updatedProducts = res.data.map((product: Product) => ({
          ...product,
          quantity: product.quantity ?? 0,
          price: product.defaultPrice ?? product.price ?? 0,
          result: (product.quantity ?? 0) * (product.price ?? 0),
          //defaultPrice: product.defaultPrice ?? product.price ?? 0,
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => cancel();
  }, []);
 return {products,error,isLoading,setError,setProducts,setLoading};
}
export default useProducts;


