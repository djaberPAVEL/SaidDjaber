import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
//import { NewProduct, Product } from "../../services/product-service";

import  { Employee } from "../services/employee-service";
import React from "react";

interface Prop {
  onCreate: (arg: Employee) => void;
  id?: string;
  first_name?: string;
  last_name?: string;

  //customerName:string;
  
  //isGold?: Boolean;
  phone?: string;
  buttonName: string;
  heading: string;
  email: string;
  department_name:string
  situa_famil:string
  num_secu_social:number
  job_title:string,
  buttonColor:string
}

function ModelEmployee({
  onCreate,
  first_name,
  last_name,
 // isGold,
  phone,
  buttonName,
  buttonColor,
  heading,
  id,
  email,
  department_name,
  situa_famil,
  num_secu_social,
  job_title
  
}: Prop)

{
  const [object, setObject] = useState({
    // _id: "qqqq",
    id: id ? id : "qqqq",
    first_name: first_name ? first_name : " ",
    last_name: last_name ? last_name : " ",
   // isGold:  false,
    phone: phone ? phone : "",
    email: email ? email : "",
    department_name: department_name ? department_name : "",
    situa_famil: situa_famil ? situa_famil : "",
    job_title: job_title ? job_title : "",
    num_secu_social: num_secu_social ? num_secu_social : 0,
    

    // customerId: "", // Initialize customerId as an empty string
    // customerCustomerName: "riski", // Initialize customerId as an empty string
  });

  //const {categories,isLoadingCategories,errorCategories,setCategories,setErrorCategories}= useCategories();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/categories")
  //     .then((res) => {
  //       setCategories(res.data);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      onCreate(object);
      handleClose();
    } catch (error) {
      console.error(error);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setError(null); // Clear error message on close
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={`btn ${buttonColor} mx-1`} onClick={handleShow}>
        {buttonName}
      </Button>

      <Modal key={object.id} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>الاسم: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, first_name: event.target.value })
                }
                value={object.first_name}
              />
              <Form.Label>اللقب: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, last_name: event.target.value })
                }
                value={object.last_name}
              />
              <Form.Label>المنصب: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, job_title: event.target.value })
                }
                value={object.job_title}
              />
              
              <Form.Label>الحالة العائلية: </Form.Label>
              <Form.Control
                type="text"
                //placeholder="الحالة العائلية:"
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, situa_famil: event.target.value })
                }
                value={object.situa_famil}
              />
              <Form.Label>المصلحة: </Form.Label>
              <Form.Control
                type="text"
                //placeholder="المصلحة"
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, department_name: event.target.value })
                }
                value={object.department_name}
              />
              <Form.Label>البريد الالكتروني: </Form.Label>
              <Form.Control
                type="text"
              //placeholder="البريد الالكتروني:"
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, email: event.target.value })
                }
                value={object.email}
              />
              <Form.Label>رقم الهاتف : </Form.Label>
              <Form.Control
                type="text"
                //placeholder="رقم الهاتف .."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, phone: event.target.value })
                }
                value={object.phone}
              />
              
              
              {/* <Form.Check
                type="switch"
                id="custom-switch"
                label="is he a Gold customer ?"
                checked={object.isGold}
                onChange={(event) =>
                  setObject({ ...object, isGold: event.target.checked })
                }
              /> */}

              {error && (
                <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "حفظ..." : "حفظ"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelEmployee;
