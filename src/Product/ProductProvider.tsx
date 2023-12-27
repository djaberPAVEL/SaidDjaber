import  { useEffect, useState } from 'react'

function ProductProvider() {

    
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

  const onIncQuantity = (prop: any) => {

    setProducts(
      products.map((product) =>
        product.name === prop.name
          ? { ...product, quantity: product.quantity + 1,result:(product.price )* (product.quantity+1) }
          : product
      )
    );
    
  };
  const onDecQuantity = (pro: any) => {

    setProducts(
      products.map((product) =>
        product.name === pro.name
          ? { ...product, quantity: product.quantity - 1, result:(product.price )* (product.quantity-1) }
          : product
      )
      )
      
  };
  //price

  const onIncPrice = (prop: any) => {
    
    setProducts(
      products.map((product) =>
      product.name === prop.name
      ? { ...product, price: product.price + 1, result:(product.price +1)* product.quantity }
      : product
      )
      );

  };
  const onDecPrice = (pro: any) => {
    setProducts(
      products.map((product) =>
      product.name === pro.name
      ? { ...product, price: product.price - 1, result:(product.price -1)* product.quantity }
      : product
      )
      );

  };



  return (
    <div>ProductProvider</div>
  )
}

export default ProductProvider