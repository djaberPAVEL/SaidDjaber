import { useEffect, useState } from "react";
import customerService , { Customer } from "../services/customer-service";
import { CanceledError } from "../services/api-client";

const useCustomers = ()=>{

    const [customers, setCustomers] = useState<Customer[]>([]);
  const [errorCustomers, setErrorCustomers] = useState("");
  const [isLoadingCustomers, setLoadingCustomers] = useState(false);

  useEffect(() => {
    setLoadingCustomers(true);
    const { request, cancel } = customerService.getAll<Customer>();
    request
      .then((res) => {
        const updatedCustomers = res.data;
        setCustomers(updatedCustomers);
        setLoadingCustomers(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorCustomers(err.message);
        setLoadingCustomers(false);
      });
    return () => cancel();
  }, []);
 return {customers,errorCustomers,isLoadingCustomers,setErrorCustomers,setCustomers,setLoadingCustomers};
}
export default useCustomers;


