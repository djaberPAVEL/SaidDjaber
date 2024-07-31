import IncDec from "./IncDec.comoponet";
import { useMemo } from 'react';
import productService, {
  NewInvoiceProduct,
  Product,
} from "../../services/product-service";
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import useCustomers from "../../hooks/useCustomers";
import invoiceService, {
  Invoice,
  NewInvoice,
} from "../../services/invoice-service";
import { Form } from "react-bootstrap";
import useInvoices from "../../hooks/useInvoices";

interface Props {}

function Calulator({}: Props) {
  const { products, isLoading, error, setError, setProducts } = useProducts();
  const {
    customers,
    isLoadingCustomers,
    errorCustomers,
    setCustomers,
    setErrorCustomers,
  } = useCustomers();
  const {
    invoices,
    isLoadingInvoices,
    errorInvoices,
    setInvoices,
    setErrorInvoices,
  } = useInvoices();

  const [totalResult, setTotalResult] = useState(0);
  

  const [singleInvoice, setSingleInvoice] = useState<NewInvoice>({
    customerID: "123",
    //invoiceDueDate: string;
    items: [],
    totalAmount: 0,
    status: "paid",
  });
  const handleCustomersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCustomerId = event.target.value;
    const selectedCustomer = customers.find(
      (customer) => customer._id === selectedCustomerId
    );
    if (selectedCustomer) {
      setSingleInvoice({
        ...singleInvoice,

        customerID: selectedCustomerId,
      });
    }
  };

  const onIncQuantity = (product: Product) =>
    updateProductQuantity(product, true);
  const onDecQuantity = (product: Product) =>
    updateProductQuantity(product, false);
  const onIncPrice = (product: Product) => updateProductPrice(product, true);
  const onDecPrice = (product: Product) => updateProductPrice(product, false);

  const updateProductQuantity = (productItem: Product, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              quantity: product.quantity + (increment ? 1 : -1),
              result: product.price * (product.quantity + (increment ? 1 : -1)),
            }
          : product
      )
    );
  };

  const updateProductPrice = (productItem: Product, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.name === productItem.name
          ? {
              ...product,
              price: product.price + (increment ? 1 : -1),
              result: (product.price + (increment ? 1 : -1)) * product.quantity,
            }
          : product
      )
    );
  };
  //console.log(singleInvoice);\

  const [nonZeroQuantityProducts, setNonZeroQuantityProducts] = useState<
    NewInvoiceProduct[]
  >([]);
  useEffect(() => {
    const filteredProducts: NewInvoiceProduct[] = products
      .filter((product) => product.quantity !== 0)
      .map((product) => ({
        productID: product._id,
        quantity: product.quantity,
        price: product.price,
        total: product.result,
      }));
    setNonZeroQuantityProducts(filteredProducts);
    setSingleInvoice({ ...singleInvoice, items: filteredProducts,totalAmount:totalResult });
  }, [totalResult]);
  
  
  useEffect(() => {
    const calculatedTotal = products.reduce(
      (acc, product) => acc + product.result,
      0
    );

    setTotalResult(calculatedTotal);
  }, [products]);
  const onAddInvoice = async (newInvoice: NewInvoice) => {
    const originalInvoices = [...invoices];
    //const newInvoice = omit(invoice, "_id");
    invoiceService
      .create(newInvoice)
      .then(({ data: savedInvoice }) =>
        setInvoices([savedInvoice, ...invoices])
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorInvoices(err.message);
        setInvoices(originalInvoices);
      });
  };

  return (
    <>
      <Form.Select
        aria-label="Default select example"
        onChange={handleCustomersChange}
        value={singleInvoice.customerID}
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.name}
          </option>
        ))}
      </Form.Select>
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
              <td>{prduct.result}</td>
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

      <button
        onClick={() => onAddInvoice(singleInvoice)}
        className="btn btn-outline-danger"
      >
        save invoices
      </button>
    </>
  );
}

export default Calulator;
