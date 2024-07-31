import useCustomers from "../hooks/useCustomers";
//import Modelcustomer from "./Modalcustomer";
import customerService, { Customer } from "../services/customer-service";
import { CanceledError } from "../services/api-client";
import { omit } from "lodash";
import ModalCustomer from "./ModalCustomer";

const Customers = () => {
  const {
    customers,
    isLoadingCustomers,
    errorCustomers,
    setCustomers,
    setErrorCustomers,
  } = useCustomers();

  const onAddCustomer = async (customer: Customer) => {
    const originalCustomers = [...customers];
    //const body = { ...customer, customerId: product.customer._id };
    const newCat = omit(customer, "_id");
    customerService
      .create(newCat)
      .then(({ data: savedCustomer }) =>
        setCustomers([savedCustomer, ...customers])
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorCustomers(err.message);
        setCustomers(originalCustomers);
      });
  };
  const onUpdateCustomer = async (customer: Customer) => {
    const originalCustomers = [...customers];
    //const body = { ...customer, customerId: product.customer._id };
    const newCat = omit(customer, "_id");
    customerService
      .update(customer._id, newCat)
      .then(({ data: updatedCustomer }) =>
        setCustomers(
          customers.map((cat) =>
            cat._id === customer._id ? updatedCustomer : cat
          )
        )
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorCustomers(err.message);
        setCustomers(originalCustomers);
      });
  };

  const onDeleteCustomer = async (customer: Customer) => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter((p) => p._id !== customer._id));
    customerService.delete(customer._id).catch((err) => {
      if (err instanceof CanceledError) return;
      setErrorCustomers(err.message);
      setCustomers(originalCustomers);
    });
  };

  return (
    <>
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
          <th scope="col">Customer name</th>
          <th scope="col">Customer Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <th scope="row">{customer.name}</th>
              <td scope="row">{customer.phone}</td>
              {/* <td>{customer.defaultPrice}</td>
              <td>{customer.numberInStock}</td>
              <td>{customer.customer.name}</td> */}
              <td>
                <ModalCustomer
                  _id={customer._id}
                  name={customer.name}
                  //price={product.price}
                  onCreate={(customer: Customer) => onUpdateCustomer(customer)}
                  buttonName="Modify"
                  heading="Modify the product"
                />
                <button
                  onClick={() => onDeleteCustomer(customer)}
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
            {/* <th>Total Result</th> */}
            <th scope="row" colSpan={3}>
              <ModalCustomer
                onCreate={(customer: Customer) => onAddCustomer(customer)}
                buttonName="Add new Customer"
                heading="Add new customer"
              />
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Customers;
