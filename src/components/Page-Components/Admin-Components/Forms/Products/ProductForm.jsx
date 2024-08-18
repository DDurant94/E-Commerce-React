import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner, Col, Row} from "react-bootstrap";
import { object,func } from "prop-types";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({name:'', price:'', quantity: '',description:''});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch (error => setErrorMessage(error.message))
    }
  }, [id]);

  const validateForm = () => {
    let errors = {};
    if (!product.name) errors.name = 'Name is required';
    if (!product.price || product.price <=0) errors.price = 'Price must be a positive number';
    if (!product.quantity) errors.quantity ='Quantity is required';
    if(!product.description) errors.description = 'Description is required'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
      try {
        if(id){
          await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
        } else {
          await axios.post('http://127.0.0.1:5000/products',product);
        }
        setShowSuccessModal(true);
      } catch(error){
        setErrorMessage(error.message);
      } finally{
        setSubmitting(false);
      }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setProduct(prevProduct => ({
      ...prevProduct, [name]: value
    }));
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setProduct({name: '', price: '', quantity: '',description:''});
    setSubmitting(false);
    navigate('/products'); 
  }

  if(submitting) return <p>Submitting product data...</p>;

  return (

  <>
  <Col className="bg-info p-3 rounded m-3">

      <Form onSubmit={handleSubmit} id="add-product-form" className="bg-primary m-2 p-3 rounded">

        <h3 className="mt-3">{id ? 'Edit Product:': 'Add Product:'}</h3>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Col className="p-3 bg-dark rounded text-light">

          <Row className="p-1 m-1">
          <Form.Group controlId="productName" className="p-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>  
          </Row>

          <Row className="p-1 m-1">
          <Form.Group controlId="productPrice" className="p-3">
            <Form.Label>Price:</Form.Label>
            <Form.Control 
            type="float"
            name="price"
            value={product.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>

          <Row className="p-1 m-1">
          <Form.Group controlId="productQuantity" className="p-3">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control 
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            isInvalid={!!errors.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>

          <Row className="p-1 m-1">
          <Form.Group controlId="productDescription" className="p-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control 
            as="textarea"
            rows={4}
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>

        </Col>

        <div className="mt-3">
          <Button variant="danger" type="submit" disabled={submitting} className="me-2">
            {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
          </Button>
          <Button variant="warning" onClick={() => navigate(`/products`)} className="me-2">Products</Button>
        </div>

      </Form>

    </Col>
    <Modal show={showSuccessModal} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Product has been successfully {id ? 'updated': 'added'}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

    </Modal>

  </>
  );
}

ProductForm.propTypes = {
  selectedProduct: object,
  onProductUpdated: func
}

export default ProductForm;