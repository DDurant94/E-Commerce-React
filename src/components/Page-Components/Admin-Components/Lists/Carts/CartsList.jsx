import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array,object } from 'prop-types';
import { useNavigate } from "react-router-dom";


const CartsList = () => {
  const navigate = useNavigate();
  const [carts,setCarts] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(()=> {
    fetchCustomerCarts();

  },[])

  const fetchCustomerCarts =  (async () => {
    try{
      const response = await axios.get('http://127.0.0.1:5000/carts_by_customer');
      setCarts(response.data);
    }catch(error){
      console.error("Error fetching carts:", error);
    }
  });

  const deleteCart = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/cart/${id}`);
      setShowSuccessModal(true);
      fetchCustomerCarts();
    } catch (error){
      console.error("Error deleting cart:", error)
    }

  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/carts');
  };

  return (

    <>

    <Row>

      <Col>
        <h2>Carts:</h2>
        <Container>
          {Object.keys(carts).map(customerId => (
          <ListGroup key={customerId}>
          <h3>Customer ID: {customerId}</h3>
          {carts[customerId].map((cart, index) => (
            <ListGroupItem key={index}>
              <h4>Cart ID: {cart.cart_id}</h4>
              <ListGroup>
                {cart.items.map(item => (
                  <ListGroupItem key={item.product_id} className="d-flex justify-content-between align-items-center">
                    Product ID: {item.product_id} <br /> 
                    Name: {item.name} <br /> 
                    Price: {item.price} <br />
                    Quantity: {item.quantity} <br />
                    <div>
                      <Button variant="primary" onClick={() => navigate(`/cart-details/${customerId}`)} className="me-2">Details</Button>
                      <Button variant="warning" onClick={() => navigate(`/cart-form/${cart.cart_id}`)} className="me-2">Edit</Button>
                      <Button variant="danger" onClick={() => deleteCart(cart.cart_id)} className="me-2">Delete</Button>
                    </div>
                  </ListGroupItem>))}
              </ListGroup>
            </ListGroupItem>))}
          </ListGroup>))}
        </Container>

      </Col>

    </Row>

    <Modal show={showSuccessModal} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Cart has been successfully deleted.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

    </Modal>

  </>


  );

};

export default CartsList;