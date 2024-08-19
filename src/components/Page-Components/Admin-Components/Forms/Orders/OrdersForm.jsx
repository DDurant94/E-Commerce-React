import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner, ListGroup, ListGroupItem, Col , Row } from "react-bootstrap";
import { object,func } from "prop-types";
import axios from "axios";

const OrderForm = () => {
  const [order, setOrder] = useState({customer_id:'',products:[{product_id:'',quantity:''}]});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
       axios.get(`http://127.0.0.1:5000/orders/${id}`)
      .then(response => {
        setOrder({customer_id:response.data.customer.customer_id,products:response.data.products});
      })
      .catch (error => setErrorMessage(error.message))
    }
  }, [id]);

  const validateForm = () => {
    let errors = {};
    if (!order.products.map(item => item.product_id)) errors.product_id = 'Product ID is required is required';
    if (!order.products.map(item => item.quantity)) errors.quantity = 'Quantity can not be 0';
    if (!order.customer_id) errors.customer_id = 'Customer ID is required';
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    let orderData = {customer_id:order.customer_id,products:[]}
    for(let productData of order.products){
      orderData.products.push({product_id:productData.product_id,quantity:productData.quantity})
    }
      try {
        if(id){
          await axios.put(`http://127.0.0.1:5000/orders/${id}`, orderData);
        } else {
          await axios.post('http://127.0.0.1:5000/orders',order);
        }
        setShowSuccessModal(true);
      } catch(error){
        setErrorMessage(error.message);
      } finally{
        setSubmitting(false);
      }
  };

  const handleChange = (event, index = null) => {
    const { name, value } = event.target;

    if (name === 'customer_id') {
      setOrder(prevState => ({
        ...prevState,
        customer_id: value,
      }));
    } else if (name === 'product_id' && index !== null) {
      const updatedProducts = [...order.products];
      updatedProducts[index].product_id = value;
      setOrder(prevState => ({
        ...prevState,
        products: updatedProducts,
      }));
    } else if (name === 'quantity' && index !== null) {
      const updatedProducts = [...order.products];
      updatedProducts[index].quantity = value;
      setOrder(prevState => ({
        ...prevState,
        products: updatedProducts,
      }));
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setOrder({customer_id:'',products:[{product_id:'',quantity:''}]});
    setSubmitting(false);
    navigate('/orders'); 
  }
  console.log(order.products)

  if(submitting) return <p>Submitting Customer data...</p>;

  return (
    <>
    <Col className="bg-info p-3 rounded m-3">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Row className="p-3">
        <Form onSubmit={handleSubmit} id="add-customer-account-form" className="bg-primary p-4 rounded">

          <ListGroup>
            <h3 className="mt-3">{id ? 'Edit Order:': 'Add Order:'}</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Col className="p-3 bg-dark rounded text-light">
              <Row className="p-1 m-1 rounded">
                <ListGroupItem>

                    <Form.Group controlId="customerId" className="p-3">
                      <Form.Label>Customer ID:</Form.Label>
                      <Form.Control 
                      type="number"
                      name="customer_id"
                      value={order.customer_id}
                      onChange={handleChange}
                      isInvalid={!!errors.customer_id}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.customer_id}
                      </Form.Control.Feedback>
                    </Form.Group>
                </ListGroupItem>

              </Row>
              
              <Row className="p-1 m-1 rounded">
                {order.products.map((item,index) => 
                <ListGroupItem key={`productId-${index}`}>

                <Form.Group controlId={`productId-${index}`} className="p-3">
                  <Form.Label>Product ID:</Form.Label>
                  <Form.Control 
                  type="number"
                  name="product_id"
                  value={item.product_id}
                  onChange={(e) => handleChange(e, index)}
                  isInvalid={!!errors.product_id}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.product_id}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId={`quantity-${index}`} className="p-3">
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

                </ListGroupItem>)}
              </Row>
            </Col>
          </ListGroup>

          <div className="mt-3">
            <Button variant="danger" type="submit" disabled={submitting} className="me-2">
              {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
            </Button>
            <Button variant="warning" onClick={() => navigate(`/orders`)} className="me-2">Orders</Button>
          </div>

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
          Order has been successfully {id ? 'updated': 'added'}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );

};

OrderForm.propTypes = {
  selectedOrder: object,
  onOrderUpdated: func
}

export default OrderForm;