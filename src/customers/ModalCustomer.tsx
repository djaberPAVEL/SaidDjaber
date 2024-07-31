import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
//import { NewProduct, Product } from "../../services/product-service";

import customerService, { Customer } from "../services/customer-service";

interface Prop {
  onCreate: (arg: Customer) => void;
  name?: string;

  //customerName:string;
  _id?: string;
  isGold?: Boolean;
  phone?: string;
  buttonName: string;
  heading: string;
}

function ModelCustomer({
  onCreate,
  name,
  isGold,
  phone,
  buttonName,
  heading,
  _id,
}: Prop) {
  const [object, setObject] = useState({
    // _id: "qqqq",
    _id: _id ? _id : "qqqq",
    name: name ? name : "",
    isGold:  false,
    phone: phone ? phone : "",

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
      <Button variant="btn btn-outline-secondary mx-1" onClick={handleShow}>
        {buttonName}
      </Button>

      <Modal key={object._id} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, name: event.target.value })
                }
                value={object.name}
              />
              <Form.Label>phone: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Add the Phone number .."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, phone: event.target.value })
                }
                value={object.phone}
              />
              <Form.Label>isGold: </Form.Label>
              
              <Form.Check
                type="switch"
                id="custom-switch"
                label="is he a Gold customer ?"
                checked={object.isGold}
                onChange={(event) =>
                  setObject({ ...object, isGold: event.target.checked })
                }
              />

              {error && (
                <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelCustomer;
