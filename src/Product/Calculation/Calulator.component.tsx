import { useEffect, useState } from "react";
import IncDec from "./IncDec.comoponet";

function Calulator() {
  const [products, setProducts] = useState([
    { name: "Hara", quantity: 3, price: 10, result: 3 * 10 },
    { name: "Tomato", quantity: 8, price: 20, result: 0 },
    { name: "cofe", quantity: 0, price: 90, result: 0 },
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
          ? {
              ...product,
              quantity: product.quantity + 1,
              result: product.price * (product.quantity + 1),
            }
          : product
      )
    );
  };
  const onDecQuantity = (pro: any) => {
    setProducts(
      products.map((product) =>
        product.name === pro.name
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

  const onIncPrice = (prop: any) => {
    setProducts(
      products.map((product) =>
        product.name === prop.name
          ? {
              ...product,
              price: product.price + 1,
              result: (product.price + 1) * product.quantity,
            }
          : product
      )
    );
  };
  const onDecPrice = (pro: any) => {
    setProducts(
      products.map((product) =>
        product.name === pro.name
          ? {
              ...product,
              price: product.price - 1,
              result: (product.price - 1) * product.quantity,
            }
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
          <tr key={prdu.name}>
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
            <td>{prdu.result}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Total Resulat</th>
          <th scope="row" colSpan={3}>
            {totalResult}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default Calulator;
