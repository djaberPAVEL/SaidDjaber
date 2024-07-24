import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { NewProduct, Product } from "../../services/product-service";

interface Prop {
  onCreate: (arg: Product) => void;
  name?: string;
  price?: number;
  //categoryName:string;
  _id?: string;
  buttonName: string;
  heading: string;
}

function ModelProduct({
  onCreate,
  name,
  price,
  buttonName,
  heading,
  _id,
}: Prop) {
  const [object, setObject] = useState({
    // _id: "qqqq",
    _id: _id ? _id : "qqqq",
    name: name ? name : "",
    defaultPrice: price ? price : 0,
    numberInStock: 0,
    price: 0,
    quantity: 0,
    result: 0,
    // categoryId: "", // Initialize categoryId as an empty string
    // categoryName: "riski", // Initialize categoryId as an empty string
    category: { _id: "", name: "riski" },
  });

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    if (selectedCategory) {
      // console.log("selectedCategoryId :", selectedCategoryId);
      // console.log("selectedCategory.name : :", selectedCategory.name);
      // console.log("befor setObject", object);
      setObject({
        ...object,
        // categoryId: selectedCategoryId,
        // categoryName: selectedCategory.name,
        category: { _id: selectedCategoryId, name: selectedCategory.name },
      });
      //console.log("after setObject", object);
    }
    //console.log(object);
  };

  const handleSave = async () => {
    if (object.category._id === "") {
      setError("Please select a category.");
      return;
    }
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
              <Form.Label>Number in stock: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Add the number of products in stock.."
                onChange={(event) =>
                  setObject({
                    ...object,
                    numberInStock: parseInt(event.target.value, 10),
                  })
                }
                value={object.numberInStock}
              />

              <Form.Label>Category: </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleCategoryChange}
                value={object.category._id}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              {error && (
                <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
              )}

              <Form.Label>Default price: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Add the default price of a product.."
                onChange={(event) =>
                  setObject({
                    ...object,
                    //defaultPrice: event.target.value,
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
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelProduct;
