import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal, Form,Spinner} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { object,func } from "prop-types";

const ProductDetails = ({params}) => {
  const [product, setProduct] = useState([]);
  const [cart,setCart] = useState({customer_id:'',items:[]});
  const [customersCart,setCustomersCart] = useState([]);
  const [formData, setFormData] = useState({customer_id:"",quantity:""});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const id = useParams();

  const addProduct = async (productToAdd) => {
    setCart({customer_id:(productToAdd.customer_id),items:[{product_id:(id.id), quantity:(productToAdd.quantity)}]});
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.customer_id) errors.customer_id = 'Customer ID required';
    if (!formData.quantity) errors.quantity = 'Quantity required';
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addProduct(formData);
    if (!validateForm()) return;
    setSubmitting(true);
      try {
        await axios.post(`http://127.0.0.1:5000/cart`,cart);
        setShowSuccessModal(true);
      } catch(error){
        setErrorMessage(error.message);
      } finally{
        setSubmitting(false);
      }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setFormData({customer_id:'',quantity:''})
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prevCustomerId => ({
      ...prevCustomerId, [name]: value
    }));
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
    <Container>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem key={product.id}>
              <h3>{product.name}:</h3>
              Price: ${product.price} <br />
              Quantity: {product.quantity} In Stock <br />
              Description: {product.description} <br />
              <Button variant="primary" onClick={() => navigate(`/products`)} className="me-2">Products</Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit} id="adding to cart">

            <Form.Group controlId="customerId">
              <Form.Label>Customer ID:</Form.Label>
              <Form.Control 
              type="number"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              isInvalid={!!errors.customer_id}/>
              <Form.Control.Feedback type="invalid">
                {errors.customer_id}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control 
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}/>
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <Button variant="secondary" className="me-2" type="submit" disabled={submitting}>
              {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Add to Cart'}
              </Button>
            </div>
            
          </Form>
        </Col>
      </Row>



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

    </Container>
  );

};

ProductDetails.propTypes = {
  params: object,
  id: object,
}

export default ProductDetails;