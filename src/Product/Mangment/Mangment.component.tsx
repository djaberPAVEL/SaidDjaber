import { omit } from "lodash";
import productService, { Product } from "../../services/product-service";
import ModelProduct from "./ModalProduct";
import useProducts from "../../hooks/useProducts";
import { CanceledError } from "../../services/api-client";

function Mangment({}) {
  const { products, isLoading, error, setError, setProducts } = useProducts();
  //const {categories,isLoadingCategories,errorCategories,setCategories,setErrorCategories}= useCategories();

  const onAddProduct = async (product: Product) => {
    const originalProducts = [...products];
    const body = { ...product, categoryId: product.category._id };
    const newProd = omit(
      body,
      "_id",
      "category",
      "price",
      "result",
      "quantity"
    );
    productService
      .create(newProd)
      .then(({ data: savedProduct }) =>
        setProducts([savedProduct, ...products])
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setError(err.message);
        setProducts(originalProducts);
      });
  };

  const onUpdateProduct = async (prop: Product) => {
    const originalProducts = [...products];
    const body = { ...prop, categoryId: prop.category._id };
    const newProd = omit(
      body,
      "_id",
      "category",
      "price",
      "result",
      "quantity"
    );
    productService
      //.updateProduct(prop._id, omit(body, "_id", "category"))
      .update(prop._id, newProd)
      .then(({ data: updatedProduct }) =>
        setProducts(
          products.map((product) =>
            product._id === prop._id ? updatedProduct : product
          )
        )
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setError(err.message);
        setProducts(originalProducts);
      });
  };

  const onDeleteProduct = async (product: Product) => {
    const originalProducts = [...products];
    setProducts(products.filter((p) => p._id !== product._id));
    productService.delete(product._id).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setProducts(originalProducts);
    });
  };
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
