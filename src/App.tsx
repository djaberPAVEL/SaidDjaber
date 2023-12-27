import { useEffect, useState } from 'react';
import './App.css'
import Calulator from './Product/Calculation/Calulator.component'
import Product from './Product/ProductProp'
import Mangment from './Product/Mangment/Mangment.component'



function App() {
  
  const [products, setProducts] = useState([
    { name: "Hara", quantity: 3, price: 10, result: 3 * 10 },
    { name: "Tomato", quantity: 8, price: 20,result:0 },
    { name: "cofe", quantity: 0, price: 90 ,result:0},
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
          ? { ...product, quantity: product.quantity + 1,result:(product.price )* (product.quantity+1) }
          : product
      )
    );
    
  };
  const onDecQuantity = (productItem: Product) => {

    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? { ...product, quantity: product.quantity - 1, result:(product.price )* (product.quantity-1) }
          : product
      )
      )
      
  };
  //price

  const onIncPrice = (productItem: Product) => {
    
    setProducts(
      products.map((product) =>
      product.name === productItem.name
      ? { ...product, price: product.price + 1, result:(product.price +1)* product.quantity }
      : product
      )
      );

  };
  const onDecPrice = (productItem: Product) => {
    setProducts(
      products.map((product) =>
      product.name === productItem.name
      ? { ...product, price: product.price - 1, result:(product.price -1)* product.quantity }
      : product
      )
      );

  };

  const onAddProduct = (prduct:any) => {
    setProducts([...products, { name: prduct.name, quantity: 0, price: prduct.price,result:0 }]);
  };

  return (
    <>
      {/* <Calulator
        products={products}
        onDecQuantity={(product)=>onDecQuantity(product)}
        onIncPrice={(product)=>onIncPrice(product)}
        onDecPrice={(product)=>onDecPrice(product)}
        onIncQuantity={(product)=>onIncQuantity(product)}
        totalResult={totalResult}
      /> */}
    <Mangment
     products={products}
     onIncPrice={(product)=>onIncPrice(product)}
     onDecPrice={(product)=>onDecPrice(product)}
     onAddProduct={(product:any)=>onAddProduct(product)}
    /> 
    </>
  )
}

export default App
