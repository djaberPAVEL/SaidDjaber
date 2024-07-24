import { useEffect, useState } from "react";
import "./App.css";
import Calulator from "./Product/Calculation/Calulator.component";
import Mangment from "./Product/Mangment/Mangment.component";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import { omit } from "lodash";
import { CanceledError } from "./services/api-client";
import productService, { Product } from "./services/product-service";

function App() {
  const [totalResult, setTotalResult] = useState(0);
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

  useEffect(() => {
    const calculatedTotal = products.reduce(
      (acc, product) => acc + product.result,
      0
    );
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

  const onAddProduct = async (product: Product) => {
    const originalProducts = [...products];
    const body = { ...product, categoryId: product.category._id };
    const newProd = omit(body, "_id", "category","price","result","quantity");
    productService
      .create(newProd)
      .then(({ data: savedProduct }) =>
        setProducts([savedProduct, ...products])
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setError(err.message);
        setProducts(originalProducts);
      });

    // setProducts([
    //   ...products,
    //   {
    //     ...product,
    //   },
    // ]);
  };

  const onUpdateProduct = async (prop: Product) => {
    const originalProducts = [...products];
    const body = { ...prop, categoryId: prop.category._id };
    const newProd = omit(body, "_id", "category","price","result","quantity");
    productService
      //.updateProduct(prop._id, omit(body, "_id", "category"))
      .update(prop._id, newProd)
      .then(({ data: updatedProduct }) =>
        setProducts(
          products.map((product) =>
            product._id === prop._id ? updatedProduct : product
          )
        )
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setError(err.message);
        setProducts(originalProducts);
      });

    // setProducts(
    //   products.map((product) =>
    //     product._id === prop._id
    //       ? {
    //           ...product,
    //           name: prop.name,
    //           price: prop.defaultPrice,
    //           defaultPrice: prop.defaultPrice,
    //           category: prop.category,
    //         }
    //       : product
    //   )
    // );
    // console.log(prop);
  };

  const onDeleteProduct = async (product: Product) => {
    const originalProducts = [...products];
    setProducts(products.filter((p) => p._id !== product._id));
    productService.delete(product._id).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setProducts(originalProducts);
    });
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
                <>
                  {error && <p className="text-danger">{error}</p>}
                  {isLoading && <div className="spinner-border"></div>}
                  <Calulator
                    products={products}
                    onDecQuantity={(product) =>
                      updateProductQuantity(product, false)
                    }
                    onIncPrice={(product) => updateProductPrice(product, true)}
                    onDecPrice={(product) => updateProductPrice(product, false)}
                    onIncQuantity={(product) =>
                      updateProductQuantity(product, true)
                    }
                    totalResult={totalResult}
                  />
                </>
              }
            />
            <Route
              path="mangment"
              element={
                <>
                  {error && <p className="text-danger">{error}</p>}
                  <Mangment
                    products={products}
                    onIncPrice={(product) => updateProductPrice(product, true)}
                    onDecPrice={(product) => updateProductPrice(product, false)}
                    onAddProduct={(product: any) => onAddProduct(product)}
                    onUpdateProduct={(product: any) => onUpdateProduct(product)}
                    onDeleteProduct={(product: any) => onDeleteProduct(product)}
                  />
                </>
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
