import React from 'react'
import Product from '../ProductProp'
import IncDec from '../Calculation/IncDec.comoponet'
import ModelProduct from './ModalProduct'

interface NewProduct {
  name:string,
  price:number
}

interface Props {
  products:Product []
  onIncPrice:(arg:Product)=>void
  onDecPrice:(arg:Product)=>void
  onAddProduct:(arg:NewProduct)=>void
}



function Mangment({products,onIncPrice,onDecPrice,onAddProduct}:Props) {
  return (
    <>
     
     <table className="table table-bordered border-primary ">
    <thead>
      <tr>
        <th scope="col">Pruduct name</th>
        <th scope="col">Default price</th>
        <th scope="col">Action</th>

      </tr>
    </thead>
    <tbody>
      {products.map((prduct) => (
        <tr key={prduct.name}>
          <th scope="row">{prduct.name}</th>
          <td>
            <IncDec
              onInc={() => onIncPrice(prduct)}
              onDes={() => onDecPrice(prduct)}
              number={prduct.price}
            />
          </td>
          <td >
            <button className="btn btn-info">Modifiy</button>
            <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
      ))}
    </tbody>
      <tfoot>
          <tr>
              <th>Total Resulat</th>
          <th scope="row" colSpan={3}>
          <ModelProduct onCreate={(newProduct:NewProduct)=>onAddProduct(newProduct)} />
          </th>
          </tr>
      </tfoot>
  </table>
    </>
   
  )
}

export default Mangment