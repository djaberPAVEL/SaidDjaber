import React from "react";
import { NewProduct, Product } from "../ProductProp";
import IncDec from "../Calculation/IncDec.comoponet";
import ModelProduct from "./ModalProduct";

interface Props {
  products: Product[];
  onIncPrice: (arg: Product) => void;
  onDecPrice: (arg: Product) => void;
  onAddProduct: (arg: NewProduct) => void;
  onUpdateProduct: (arg: NewProduct) => void;
  onDeleteProduct: (arg: Product) => void;
}

function Mangment({
  products,
  onIncPrice,
  onDecPrice,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: Props) {
  return (
    <>
      <table className="table table-bordered border-primary ">
        <thead>
          <tr>
            <th scope="col">Pruduct name</th>
            <th scope="col">Default price</th>
            <th scope="col">Quantity in stock</th>
            <th scope="col">Cathegory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name}>
              <th scope="row">{product.name}</th>
              <td>{product.defaultPrice}</td>
              <td>{product.numberInStock}</td>
              <td>{product.category.name}</td>
              <td>
                <ModelProduct
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  //categoryName={product.category.name}
                  onCreate={(product: NewProduct) => onUpdateProduct(product)}
                  buttonName="Modifiy"
                  heading="Modifiy the product"
                />

                <button
                  onClick={() => onDeleteProduct(product)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Resulat</th>
            <th scope="row" colSpan={3}>
              <ModelProduct
                onCreate={(newProduct: NewProduct) => onAddProduct(newProduct)}
                //categoryName={product.category.name}
                buttonName="Add new product"
                heading="Adding new product" 
                //categoryName={""}             
                 />
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Mangment;
