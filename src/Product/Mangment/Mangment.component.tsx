import React from 'react'
import  { NewProduct,Product } from '../ProductProp'
import IncDec from '../Calculation/IncDec.comoponet'
import ModelProduct from './ModalProduct'

interface Props {
  products:Product []
  onIncPrice:(arg:Product)=>void
  onDecPrice:(arg:Product)=>void
  onAddProduct:(arg:NewProduct)=>void;
  onUpdateProduct:(arg:NewProduct)=>void;
  onDeleteProduct:(arg:NewProduct)=>void;
}



function Mangment({products,onIncPrice,onDecPrice,onAddProduct,onUpdateProduct,onDeleteProduct}:Props) {
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
      {products.map((product) => (
        <tr key={product.name}>
          <th scope="row">{product.name}</th>
          <td>
              {product.defaultPrice}
          </td>
          <td >
            <ModelProduct 
            id={product.id}
            name={product.name}
             price={product.price}  
             onCreate={(prduct:NewProduct)=>onUpdateProduct(prduct)} 
             buttonName='Modifiy'
             heading="Modifiy the product"
             />

            <button onClick={()=>onDeleteProduct(product)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
      ))}
    </tbody>
      <tfoot>
          <tr>
              <th>Total Resulat</th>
          <th scope="row" colSpan={3}>
          <ModelProduct
           onCreate={(newProduct:NewProduct)=>onAddProduct(newProduct)} 
           buttonName='Add new product'
           heading='Adding new product'
           />
          </th>
          </tr>
      </tfoot>
  </table>
    </>
   
  )
}

export default Mangment