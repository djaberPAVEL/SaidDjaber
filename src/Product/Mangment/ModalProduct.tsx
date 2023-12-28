import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NewProduct } from "../ProductProp";


interface Prop {
  onCreate: (arg: NewProduct) => void;
  name?:string,
  price?:number,
  id?:number,
  buttonName:string,
  heading:string
}

function ModelProduct({ onCreate,name,price,buttonName,heading,id }: Prop) {
  const [object, setObject] = useState({ 
    id: id ? id:999789,
    name: name ? name:'', 
    defaultPrice:price?price:0 
});

  const [show, setShow] = useState(false);
  const handleSave = () => {
    onCreate(object);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Add name of your product.."
                autoFocus
                onChange={(event) =>
                  setObject({ ...object, name: event.target.value })
                }
                value={object.name}
              />
              <Form.Label>Default price: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Add the default price of a product.."
                onChange={(event) =>
                  setObject({
                    ...object,
                    defaultPrice: parseFloat(event.target.value),
                  })
                }
                
                value={object.defaultPrice}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelProduct;
