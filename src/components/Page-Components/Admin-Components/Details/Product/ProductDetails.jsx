import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal, Form,Spinner,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { object,func } from "prop-types";

const ProductDetails = ({params}) => {
  const [product, setProduct] = useState([]);
  const [customersCart,setCustomersCart] = useState([]);
  const [formData, setFormData] = useState({customer_id: '',items: [{ product_id: params.id, quantity: '' }]})
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const lowStockThreshold = 10;
  const navigate = useNavigate();
  const id = useParams();

  const validateForm = () => {
    let errors = {};
    if (!formData.customer_id) errors.customer_id = 'Customer ID required';
    formData.items.forEach((item, index) => {
      if (!item.product_id) {
        errors[`product_id_${index}`] = 'Product ID required';
      }
      if (!item.quantity) {
        errors[`quantity_${index}`] = 'Quantity required';
      }
    });
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
      try {
        await axios.post(`http://127.0.0.1:5000/cart`,formData);
        setShowSuccessModal(true);
      } catch(error){
        setErrorMessage(error.message);
      } finally{
        setSubmitting(false);
      }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setFormData({customer_id: '',items:[{ product_id: params.id, quantity: '' }]})
  };

  const handleChange = (event, index = null) => {
    const { name, value } = event.target;

    if (name === 'customer_id') {
      setFormData(prevState => ({
        ...prevState,
        customer_id: value,
      }));
    } else if (name === 'product_id' && index !== null) {
      const updatedProducts = [...formData.items];
      updatedProducts[index].product_id = value;
      setFormData(prevState => ({
        ...prevState,
        items: updatedProducts,
      }));
    } else if (name === 'quantity' && index !== null) {
      const updatedProducts = [...formData.items];
      updatedProducts[index].quantity = value;
      setFormData(prevState => ({
        ...prevState,
        items: updatedProducts,
      }));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const id = params.id;
      try{
        if(id){
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`)
          const responseCustomersCart = await axios.get(`http://127.0.0.1:5000/carts_by_customer`);
          setCustomersCart(responseCustomersCart.data);
          setProduct(response.data);
        }
      } catch(error){
        console.error('Error getting product details:', error)
      }
    }
    fetchProduct()
  },[params]);
  return (

    <>
    <Col className="m-3 p-3 bg-primary rounded">
      <Row className="m-2 p-3 bg-info rounded">
        <ListGroup>
          
          <ListGroupItem key={product.id}>
            <Col className="p-3 mb-2 rounded">
              <Row className="p-2">
                <h2>{product.name}:</h2>
              </Row>
              <Row className="p-2">
                <div>
                ID#:{product.id}
                </div>
              </Row>
              <Row className="p-2">
                <div>
                  Price: ${product.price}
                </div>
              </Row>
              <Row className="p-2">
                <div>
                  Quantity: {product.quantity} In Stock
                </div>
                {product.quantity < lowStockThreshold && (<Alert variant="warning">Low Stock Alert: Only {product.quantity} left in stock!</Alert>)}
              </Row>
              <Row className="p-2">
                <div>
                  Description: {product.description}
                </div>
              </Row>
            </Col>
            <Button variant="primary" onClick={() => navigate(`/products`)} className="me-2">Products</Button>
          </ListGroupItem>
        </ListGroup>
      </Row>

      <Row className="m-2 p-3 bg-info rounded">
        
        <Form onSubmit={handleSubmit} id="adding-to-cart" className="p-2">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        <Col className="p-4 mb-2 bg-light-subtle text-white rounded">
          <Row className="p-3">
            <h3>Add to Cart:</h3>
          </Row>
          <Row className="p-3 mb-3 border border-light rounded mb-1">
            <Form.Group controlId="customerId">
              <Form.Label>Customer ID:</Form.Label>
              <Form.Control
                type="number"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                isInvalid={!!errors.customer_id}
              />
              <Form.Control.Feedback type="invalid">
                {errors.customer_id}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="p-3 mb-3 border border-light rounded">
            {formData.items.map((item, index) => (
            <div key={index}>
              <Form.Group controlId={`productId-${index}`} className="">
                <Form.Label>Product ID:</Form.Label>
                <Form.Control
                  type="number"
                  name="product_id"
                  value={item.product_id}
                  onChange={(e) => handleChange(e, index)}
                  isInvalid={!!errors.product_id}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.product_id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId={`quantity-${index}`} className="">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, index)}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </div>))}
          </Row>
        </Col>

      <Button variant="danger" className="me-2" type="submit" disabled={submitting}>
        {submitting ? <Spinner as="span" animation="border" size="md" /> : 'Add to Cart'}
      </Button>
    </Form>
      </Row>

    </Col>

      <Modal show={showSuccessModal} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Product has been successfully add to your cart.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>

    </>
  );

};

ProductDetails.propTypes = {
  params: object,
  id: object,
}

export default ProductDetails;