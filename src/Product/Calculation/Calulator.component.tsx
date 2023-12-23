import { useState } from "react";
import IncDec from "./IncDec.comoponet";

function Calulator() {
  const [products, setProducts] = useState([
    { name: "Hara", quantity: 3, price: 10,resulat:0},
    { name: "Tomato", quantity: 8, price: 20,resulat:0 },
    { name: "cofe", quantity: 0, price: 90 ,resulat:0},
  ]);
  //quantity
  const onIncQuantity = (prop: any) => {
    setProducts(
      products.map((product) =>
        product.name === prop.name
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );

    setProducts(
      products.map((product) =>
        product.name === prop.name
          ? { ...product, resulat: product.quantity* product.price }
          : product
      )
    );
  };
  const onDecQuantity = (pro: any) => {
    setProducts(
      products.map((product) =>
        product.name === pro.name
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  //price
  const onIncPrice = (prop: any) => {
    setProducts(
      products.map((product) =>
        product.name === prop.name
          ? { ...product, price: product.price + 1 }
          : product
      )
    );
  };
  const onDecPrice = (pro: any) => {
    setProducts(
      products.map((product) =>
        product.name === pro.name
          ? { ...product, price: product.price - 1 }
          : product
      )
    );
  };
 
  return (
    <table className="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">Pruduct name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Resulat</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prdu) => (
          <tr>
            <th scope="row">{prdu.name}</th>
            <td>
              <IncDec
                onInc={() => onIncQuantity(prdu)}
                onDes={() => onDecQuantity(prdu)}
                number={prdu.quantity}
              />
            </td>
            <td>
              <IncDec
                onInc={() => onIncPrice(prdu)}
                onDes={() => onDecPrice(prdu)}
                number={prdu.price}
              />
            </td>
            <td>{prdu.quantity * prdu.price}</td>
          </tr>
        ))}
      </tbody>
        <tfoot>
            <tr>
                <th>Total Resulat</th>
            <th scope="row" colSpan={4}>
            </th>

            </tr>
        </tfoot>
    </table>
  );
}

export default Calulator;
