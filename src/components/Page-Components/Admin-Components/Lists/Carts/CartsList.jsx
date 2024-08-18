import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
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

    <Col className="m-2  p-3 rounded">

      <Row className="bg-info p-3 rounded">
        <h2 className="text-center mb-2">Carts:</h2>
        <Container className="p-1">
          {Object.keys(carts).map(customerId => (
          <ListGroup key={customerId} className=" bg-primary my-3 p-4">
          <h3 className="bg-black text-white p-2 rounded mx-1">Customer ID: {customerId}</h3>
          {carts[customerId].map((cart, index) => (
            <ListGroupItem key={index} className="rounded m-1">
              <h4>Cart ID: {cart.cart_id}</h4>
              <ListGroup>
                {cart.items.map(item => (
                  <ListGroupItem key={item.product_id} className="d-flex justify-content-between align-items-center my-1">
                    <Col>
                      <Row className="p-2">
                        <div className="">
                          Product ID: {item.product_id}
                        </div>
                      </Row>
                      <Row className="p-2">
                        <div className="">
                          Name: {item.name} 
                        </div>
                      </Row>
                      <Row className="p-2">
                        <div className="">
                          Quantity: {item.quantity}
                        </div>
                      </Row>
                    <div>
                      <Col className="d-flex justify-content-between align-items-center">
                        <Row className="m-2">
                          <Button variant="primary" onClick={() => navigate(`/cart-details/${customerId}`)} className="me-2">Details</Button>
                        </Row>
                        <Row className="m-2">
                          <Button variant="danger" onClick={() => deleteCart(cart.cart_id)} className="me-2">Delete</Button>
                        </Row>
                      </Col>
                    </div>
                    </Col>
                  </ListGroupItem>))}
              </ListGroup>
            </ListGroupItem>))}
          </ListGroup>))}
        </Container>

      </Row>

    </Col>

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