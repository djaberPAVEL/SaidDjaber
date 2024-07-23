import { useEffect, useState } from "react";
import "./App.css";
import Calulator from "./Product/Calculation/Calulator.component";
import { NewProduct, Product } from "./Product/ProductProp";
import Mangment from "./Product/Mangment/Mangment.component";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import axios from "axios";
//const axios = require('axios'); // legacy way

function App() {
  //   // Make a request for a user with a given ID
  // axios.get('http://localhost:3000/api/products')
  // .then(function (response) {
  //   // handle success
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });

  const [APIproducts, setAPIProducts] = useState([]);
  // const [products, setProducts] = useState([]);
  // useEffect (()=>{
  //     axios.get('http://localhost:3000/api/products')
  //     .then((res) =>setAPIProducts(res.data))
  //     .catch((err) => console.log(err.message));
  //   },[]);

  //   console.log(APIproducts);
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/categories")
  //     .then((res) => {
  //       setCategories(res.data);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  // console.log(categories);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hara",
      quantity: 3,
      price: 10,
      result: 3 * 10,
      defaultPrice: 10,
      numberInStock: 0,
      category: { id: "999999", name: "tomate" },
    },
    {
      id: 2,
      name: "Tomato",
      quantity: 8,
      price: 20,
      result: 0,
      defaultPrice: 20,
      numberInStock: 0,
      category: { id: "999999", name: "tomate" },
    },
    {
      id: 3,
      name: "cofe",
      quantity: 0,
      price: 90,
      result: 0,
      defaultPrice: 90,
      numberInStock: 0,
      category: { id: "999999", name: "tomate" },
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        const updatedProducts = res.data.map(
          (product: {
            id: any;
            name: any;
            quantity: any;
            price: any;
            defaultPrice: any;
            numberInStock: any;
            category: any;
          }) => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity ?? 0,
            price: product.defaultPrice ?? 0,
            result: (product.quantity ?? 0) * (product.price ?? 0),
            defaultPrice: product.defaultPrice ?? product.price ?? 0,
            numberInStock: product.numberInStock,
            category: product.category,
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

  //console.log(products);
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
        numberInStock: product.numberInStock,
        //category: { id: product.category.id, name: product.category.name },
        category: { id: "", name: "" },
        //category: product.category,
      },
    ]);
    //console.log("product", product);
    //console.log("prodtcts", products);
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
    console.log('Deleting product:', prop)

    setProducts(products.filter((product) => product.id !== prop.id));
    console.log('Updated products:', products);
  };
  console.log("product", products);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar></Navbar>}>
            <Route path="/" element={<Home></Home>} />
            <Route
              path="calculate"
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
              path="mangment"
              element={
                <>
                  <Mangment
                    products={products}
                    onIncPrice={(product) => onIncPrice(product)}
                    onDecPrice={(product) => onDecPrice(product)}
                    onAddProduct={(product: any) => onAddProduct(product)}
                    onUpdateProduct={(product: any) => onUpdateProduct(product)}
                    onDeleteProduct={(product: any) => onDeleteProduct(product)}
                  />
                </>
              }
            />
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Route>
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
