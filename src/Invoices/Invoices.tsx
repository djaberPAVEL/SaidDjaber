import useInvoices from "../hooks/useInvoices";
import invoiceService, { Invoice } from "../services/invoice-service";
import { CanceledError } from "../services/api-client";
import { omit } from "lodash";
import moment from 'moment';
//import ModalInvoice from "./ModalInvoice";

const Invoices = () => {
  const {
    invoices,
    isLoadingInvoices,
    errorInvoices,
    setInvoices,
    setErrorInvoices,
  } = useInvoices();
console.log(invoices);

  

  const onUpdateInvoice = async (invoice: Invoice) => {
    const originalInvoices = [...invoices];
    const newInvoice = omit(invoice, "_id");
    invoiceService
      .update(invoice._id, newInvoice)
      .then(({ data: updatedInvoice }) =>
        setInvoices(
          invoices.map((inv) =>
            inv._id === invoice._id ? updatedInvoice : inv
          )
        )
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorInvoices(err.message);
        setInvoices(originalInvoices);
      });
  };

  const onDeleteInvoice = async (invoice: Invoice) => {
    const originalInvoices = [...invoices];
    setInvoices(invoices.filter((inv) => inv._id !== invoice._id));
    invoiceService.delete(invoice._id).catch((err) => {
      if (err instanceof CanceledError) return;
      setErrorInvoices(err.message);
      setInvoices(originalInvoices);
    });
  };

  return (
    <>
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Invoice Date</th>
            <th scope="col">Invoice Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td scope="row">{invoice.customer.name}</td>
              <th scope="row">{invoice.totalAmount}</th>
              <td scope="row">{moment(invoice.date).format('MM/DD/YYYY')}</td>
              <td scope="row">{invoice.invoiceNumber}</td>
              <td>
                {/* <ModalInvoice
                  _id={invoice._id}
                  invoiceNumber={invoice.invoiceNumber}
                  invoiceDate={invoice.date}
                  customer={invoice.customer}
                  totalAmount={invoice.totalAmount}
                  onCreate={(invoice: Invoice) => onUpdateInvoice(invoice)}
                  buttonName="Modify"
                  heading="Modify the invoice"
                /> */}
                <button
                  onClick={() => onDeleteInvoice(invoice)}
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
            <th scope="row" colSpan={5}>
              {/* <ModalInvoice
                onCreate={(invoice: Invoice) => onAddInvoice(invoice)}
                buttonName="Add new Invoice"
                heading="Add new invoice"
              /> */}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Invoices;