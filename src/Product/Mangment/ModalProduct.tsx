import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


interface NewProduct {
  name:string,
  price:number
}

interface Prop {
  onCreate:(arg:NewProduct)=>void

}


function ModelProduct({onCreate}:Prop) {

  const [object,setObject] = useState({name:'',price:0})
  
  const [show, setShow] = useState(false);
  const handleSave = () =>{
    onCreate(object)
    handleClose()
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creat new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Add name of your product.."
                autoFocus
                onChange={(event)=>setObject({...object,name: event.target.value})}
                value={object.name}
              />
              <Form.Label>Default price: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Add the default price of a product.."
                onChange={(event)=>setObject({...object,price:parseFloat( event.target.value)})}
                value={object.price}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSave()}  >
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelProduct;