import { useEffect, useState } from "react";
import invoiceService, { Invoice } from "../services/invoice-service";
import { CanceledError } from "../services/api-client";

const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [errorInvoices, setErrorInvoices] = useState("");
  const [isLoadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    setLoadingInvoices(true);
    const { request, cancel } = invoiceService.getAll<Invoice>();
    request
      .then((res) => {
        const updatedInvoices = res.data;
        setInvoices(updatedInvoices);
        setLoadingInvoices(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorInvoices(err.message);
        setLoadingInvoices(false);
      });
    return () => cancel();
  }, []);

  return {
    invoices,
    errorInvoices,
    isLoadingInvoices,
    setErrorInvoices,
    setInvoices,
    setLoadingInvoices,
  };
};

export default useInvoices;