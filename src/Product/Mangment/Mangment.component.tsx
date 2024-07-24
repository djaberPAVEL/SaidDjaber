import React from "react";
import { NewProduct,Product } from "../../services/product-service";
import ModelProduct from "./ModalProduct";

interface Props {
  products: Product[];
  onIncPrice: (arg: Product) => void;
  onDecPrice: (arg: Product) => void;
  onAddProduct: (arg: Product) => void;
  onUpdateProduct: (arg: Product) => void;
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
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">Product name</th>
            <th scope="col">Default price</th>
            <th scope="col">Quantity in stock</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <th scope="row">{product.name}</th>
              <td>{product.defaultPrice}</td>
              <td>{product.numberInStock}</td>
              <td>{product.category.name}</td>
              <td>
                <ModelProduct
                  _id={product._id}
                  name={product.name}
                  price={product.price}
                  onCreate={(product: Product) => onUpdateProduct(product)}
                  buttonName="Modify"
                  heading="Modify the product"
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
            <th>Total Result</th>
            <th scope="row" colSpan={3}>
              <ModelProduct
                onCreate={(newProduct: Product) => onAddProduct(newProduct)}
                buttonName="Add new product"
                heading="Add new product"
              />
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Mangment;
