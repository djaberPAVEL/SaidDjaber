import IncDec from "./IncDec.comoponet";
import Product from "../ProductProp";

interface Props {
        products:Product []
        onIncQuantity:(arg:Product)=>void
        onDecQuantity:(arg:Product)=>void
        onIncPrice:(arg:Product)=>void
        onDecPrice:(arg:Product)=>void
        totalResult:number
}

function Calulator({products,onIncQuantity,onIncPrice,onDecQuantity,totalResult,onDecPrice}:Props) {
 
 
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
        {products.map((prduct) => (
          <tr key={prduct.name}>
            <th scope="row">{prduct.name}</th>
            <td>
              <IncDec
                onInc={() => onIncQuantity(prduct)}
                onDes={() => onDecQuantity(prduct)}
                number={prduct.quantity}
              />
            </td>
            <td>
              <IncDec
                onInc={() => onIncPrice(prduct)}
                onDes={() => onDecPrice(prduct)}
                number={prduct.price}
              />
            </td>
            <td >{prduct.result}</td>
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
