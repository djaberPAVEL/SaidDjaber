import useEmployee from "../hooks/useEmployee";
//import Modelcustomer from "./Modalcustomer";
import employeeService, { Employee } from "../services/employee-service";
import { CanceledError } from "../services/api-client";
import { omit } from "lodash";
import React from "react";
import ModalEmployee from "./ModalEmployee";
import "bootstrap/dist/css/bootstrap.min.css";

const Employees = () => {
  const {
    employees,
    isLoadingEmployee,
    errorEmployee,
    setEmployee,
    setErrorEmployee,
  } = useEmployee();

  const onAddEmployee = async (employee: Employee) => {
    const originalEmployee = [...employees];
    //const body = { ...customer, customerId: product.customer._id };
    const newCat = omit(employee, "id");
    employeeService
      .create(newCat)
      .then(({ data: savedEmployee }) =>
        setEmployee([savedEmployee, ...employees])
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorEmployee(err.message);
        setEmployee(originalEmployee);
      });
  };
  const onUpdateEmployee = async (employee: Employee) => {
    const originalEmployee = [...employees];
    //const body = { ...customer, customerId: product.customer._id };
    const newCat = omit(employee, "_id");
    employeeService
      .update(employee.id, newCat)
      .then(({ data: updatedEmployee }) =>
        setEmployee(
          employees.map((cat) =>
            cat.id === employee.id ? updatedEmployee : cat
          )
        )
      )
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setErrorEmployee(err.message);
        setEmployee(originalEmployee);
      });
  };

  const onDeleteEmployee = async (employee: Employee) => {
    const originalEmployee = [...employees];
    setEmployee(employees.filter((p) => p.id !== employee.id));
    employeeService.delete(employee.id).catch((err) => {
      if (err instanceof CanceledError) return;
      setErrorEmployee(err.message);
      setEmployee(originalEmployee);
    });
  };
  const Dashboard = () => {
    return (
      <div className="card mb-3">
        <h1 className="card-title text-center"> الموظف</h1>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-sm-auto ">
              <div className="card w-100 h-100">
                <div className="card w-100 h-100">
                  {/* <h4 className="card-title  ">إضافة موظف جديد</h4> */}
                  <ModalEmployee
                    onCreate={(employee: Employee) => onAddEmployee(employee)}
                    buttonName="إضافة موظف جديد +"
                    heading="إضافة موظف جديد"
                    email={""}
                    department_name={""}
                    num_secu_social={0}
                    situa_famil={""}
                    job_title={""}
                    buttonColor=" btn-success w-100 h-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-auto ">
              <div className="card ">
                <h4 className="card-title  ">عدد الموظفين</h4>
                <p className="card-text text-center text-sm ">
                  {employees.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="column justify-content-center">
        <div className="col-sm-auto mx-auto">
          <Dashboard />
        </div>
        <div className="table-responsive" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <table
            dir="rtl"
            className="table  table-hover align-middle "
            style={{ tableLayout: "auto", height: "5%" }}
          >
            <caption
              className="text-center"
              style={{
                captionSide: "top",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              قائمة الموظفين
            </caption>
            <thead>
              <tr>
                <th className="text-center fit-content" scope="col">
                  اسم الموظف
                </th>
                <th className="text-center" scope="col">
                  لقب الموظف
                </th>
                <th className="text-center" scope="col">
                  المنصب{" "}
                </th>
                <th className="text-center" scope="col">
                  {" "}
                  البريد الالكتروني
                </th>
                <th className="text-center" scope="col">
                  رقم الهاتف
                </th>
                <th className="text-center" scope="col">
                  {" "}
                  المصلحة
                </th>
                <th className="text-center" scope="col">
                  {" "}
                  الحالة العائلية
                </th>
                <th className="text-center" scope="col">
                  {" "}
                  رقم الضمان الاجتماعي{" "}
                </th>

                <th className="text-center" scope="col">
                  تعديل
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td scope="row">{employee.first_name}</td>
                  <td scope="row">{employee.last_name}</td>
                  <td scope="row">{employee.job_title}</td>
                  <td scope="row">{employee.email}</td>
                  <td scope="row">{employee.phone}</td>
                  <td scope="row">{employee.department_name}</td>
                  <td scope="row">{employee.situa_famil}</td>
                  <td scope="row">{employee.num_secu_social}</td>
                  {/* <td>{customer.defaultPrice}</td>
              <td scope="row">{employee.last_name}</td>
              <td>{customer.numberInStock}</td>
              <td>{customer.customer.name}</td> */}
                  <td>
                    <ModalEmployee
                      id={employee.id}
                      first_name={employee.first_name}
                      email={employee.email}
                      department_name={employee.department_name}
                      situa_famil={employee.situa_famil}
                      num_secu_social={employee.num_secu_social}
                      job_title={employee.job_title}
                      //price={product.price}
                      onCreate={(employee: Employee) =>
                        onUpdateEmployee(employee)
                      }
                      buttonName="تعديل"
                      buttonColor="btn-outline-secondary"
                      heading="تعديل معلومات الموظف"
                    />
                    <button
                      onClick={() => onDeleteEmployee(employee)}
                      className="btn btn-outline-danger"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
