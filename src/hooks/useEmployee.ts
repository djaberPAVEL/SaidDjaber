import { useEffect, useState } from "react";
import employeeService, { Employee } from "../services/employee-service";
import { CanceledError } from "../services/api-client";

const useEmployee = () => {
  const [employees, setEmployee] = useState<Employee[]>([]);
  const [errorEmployee, setErrorEmployee] = useState("");
  const [isLoadingEmployee, setLoadingEmployee] = useState(false);

  useEffect(() => {
    setLoadingEmployee(true);
    const { request, cancel } = employeeService.getAll<Employee>();
    request
      .then((res) => {
        const updatedEmployees = res.data;
        setEmployee(updatedEmployees);
        setLoadingEmployee(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorEmployee(err.message);
        setLoadingEmployee(false);
      });
    return () => cancel();
  }, []);
  return {
    employees,
    errorEmployee,
    isLoadingEmployee,
    setErrorEmployee,
    setEmployee,
    setLoadingEmployee,
  };
};
export default useEmployee;
