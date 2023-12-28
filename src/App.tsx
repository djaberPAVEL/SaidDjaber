import { useEffect, useState } from "react";
import "./App.css";
import Calulator from "./Product/Calculation/Calulator.component";
import { NewProduct, Product } from "./Product/ProductProp";
import Mangment from "./Product/Mangment/Mangment.component";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hara",
      quantity: 3,
      price: 10,
      result: 3 * 10,
      defaultPrice: 10,
    },
    {
      id: 2,
      name: "Tomato",
      quantity: 8,
      price: 20,
      result: 0,
      defaultPrice: 20,
    },
    {
      id: 3,
      name: "cofe",
      quantity: 0,
      price: 90,
      result: 0,
      defaultPrice: 90,
    },
  ]);

  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    let calculatedTotal = products.reduce((acc, product) => {
      return acc + product.result;
    }, 0);

    setTotalResult(calculatedTotal);
  }, [products]);

  const onIncQuantity = (productItem: Product) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              quantity: product.quantity + 1,
              result: product.price * (product.quantity + 1),
            }
          : product
      )
    );
  };
  const onDecQuantity = (productItem: Product) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              quantity: product.quantity - 1,
              result: product.price * (product.quantity - 1),
            }
          : product
      )
    );
  };
  //price

  const onIncPrice = (productItem: Product) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              price: product.price + 1,
              result: (product.price + 1) * product.quantity,
            }
          : product
      )
    );
  };

  const onDecPrice = (productItem: Product) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              price: product.price - 1,
              result: (product.price - 1) * product.quantity,
            }
          : product
      )
    );
  };

  const onAddProduct = (product: Product) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: product.name,
        quantity: 0,
        price: product.defaultPrice,
        result: 0,
        defaultPrice: product.defaultPrice,
      },
    ]);
    console.log("product", product);
    console.log("prodtcts", products);
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
    setProducts(products.filter((product) => product.id !== prop.id));
  };
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element="" />
          <Route
            path="/calculate"
            element={
              <Calulator
                products={products}
                onDecQuantity={(product) => onDecQuantity(product)}
                onIncPrice={(product) => onIncPrice(product)}
                onDecPrice={(product) => onDecPrice(product)}
                onIncQuantity={(product) => onIncQuantity(product)}
                totalResult={totalResult}
              />
            }
          />

          <Route
            path="/mangment"
            element={
              <Mangment
                products={products}
                onIncPrice={(product) => onIncPrice(product)}
                onDecPrice={(product) => onDecPrice(product)}
                onAddProduct={(product: any) => onAddProduct(product)}
                onUpdateProduct={(product: any) => onUpdateProduct(product)}
                onDeleteProduct={(product: any) => onDeleteProduct(product)}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {/* {<Calulator
        products={products}
        onDecQuantity={(product)=>onDecQuantity(product)}
        onIncPrice={(product)=>onIncPrice(product)}
        onDecPrice={(product)=>onDecPrice(product)}
        onIncQuantity={(product)=>onIncQuantity(product)}
        totalResult={totalResult}
      /> }
      <Mangment
        products={products}
        onIncPrice={(product) => onIncPrice(product)}
        onDecPrice={(product) => onDecPrice(product)}
        onAddProduct={(product: any) => onAddProduct(product)}
        onUpdateProduct={(product: any) => onUpdateProduct(product)}
        onDeleteProduct={(product: any) => onDeleteProduct(product)}
      /> */}
    </>
  );
}

export default App;
