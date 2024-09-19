import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
//import  useJob  from './useJob';
import { Job } from '../services/job-service';

interface Props {
    onCreate: (arg: Job) => void;
    id?: string; 
    title?: string; 
    department_id?:string; 
    employee_id?:string;
    cration_date?:Date

    
  buttonName: string;
  buttonColor:string
  heading: string;



}

function ModalJobs({
    onCreate,
    
    buttonName,
    buttonColor,
    heading,
    id,
    title,
    department_id,
    employee_id,
    cration_date,
  }: Props)
  
  {
    const [object, setObject] = useState({
      // _id: "qqqq",
      id: id ? id : "qqqq",
      title: title ? title : " ",
      department_id: department_id ? department_id : " ",
      employee_id: employee_id ? employee_id : " ",
      cration_date: cration_date?cration_date: new Date(),
     // isGold:  false,num_secu_social: num_secu_social ? num_secu_social : 0,
      
  
      // customerId: "", // Initialize customerId as an empty string
      // customerCustomerName: "riski", // Initialize customerId as an empty string
    });
    const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

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
              <Form.Label>Job Title: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, title: event.target.value })
                }
                value={object.title}
              />
              <Form.Label>department_id: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, department_id: event.target.value })
                }
                value={object.department_id}
              />
              <Form.Label>employee_id: </Form.Label>
              <Form.Control
                type="text"
               // placeholder="Add name of your Customer.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, employee_id: event.target.value })
                }
                value={object.employee_id}
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalJobs;