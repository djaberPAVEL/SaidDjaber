import { useEffect, useState } from "react";
import "./App.css";
import Calulator from "./Product/Calculation/Calulator.component";
import { Product } from "./Product/ProductProp";
import Mangment from "./Product/Mangment/Mangment.component";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import axios from "axios";

function App() {
  const [APIproducts, setAPIProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        const updatedProducts = res.data.map(
          (product: Product) => ({
            ...product,
            quantity: product.quantity ?? 0,
            price: product.defaultPrice ?? product.price ?? 0,
            result: (product.quantity ?? 0) * (product.price ?? 0),
            defaultPrice: product.defaultPrice ?? product.price ?? 0,
          })
        );
        setAPIProducts(updatedProducts);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (APIproducts.length > 0) {
      setProducts(APIproducts);
    }
  }, [APIproducts]);

  useEffect(() => {
    const calculatedTotal = products.reduce((acc, product) => acc + product.result, 0);
    setTotalResult(calculatedTotal);
  }, [products]);

  const updateProductQuantity = (productItem: Product, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              quantity: product.quantity + (increment ? 1 : -1),
              result: product.price * (product.quantity + (increment ? 1 : -1)),
            }
          : product
      )
    );
  };

  const updateProductPrice = (productItem: Product, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              price: product.price + (increment ? 1 : -1),
              result: (product.price + (increment ? 1 : -1)) * product.quantity,
            }
          : product
      )
    );
  };

  const onAddProduct = (product: Product) => {
    setProducts([
      ...products,
      {
        ...product,
        id: products.length + 1,
        quantity: 0,
        result: 0,
        category: { id: "", name: "" },
      },
    ]);
  };

  const onUpdateProduct = (prop: Product) => {
    setProducts(
      products.map((product) =>
        product.id === prop.id
          ? {
              ...product,
              name: prop.name,
              price: prop.defaultPrice,
              defaultPrice: prop.defaultPrice,
            }
          : product
      )
    );
  };

  const onDeleteProduct = (prop: Product) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== prop.id));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route
              path="calculate"
              element={
                <Calulator
                  products={products}
                  onDecQuantity={(product) => updateProductQuantity(product, false)}
                  onIncPrice={(product) => updateProductPrice(product, true)}
                  onDecPrice={(product) => updateProductPrice(product, false)}
                  onIncQuantity={(product) => updateProductQuantity(product, true)}
                  totalResult={totalResult}
                />
              }
            />
            <Route
              path="mangment"
              element={
                <Mangment
                  products={products}
                  onIncPrice={(product) => updateProductPrice(product, true)}
                  onDecPrice={(product) => updateProductPrice(product, false)}
                  onAddProduct={(product: any) => onAddProduct(product)}
                  onUpdateProduct={(product: any) => onUpdateProduct(product)}
                  onDeleteProduct={(product: any) => onDeleteProduct(product)}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
