import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array,object } from 'prop-types';
import { useNavigate } from "react-router-dom";

const OrdersList = ({orders}) => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const deleteOrder = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
      setShowSuccessModal(true);
    } catch (error){
      console.error("Error deleting order:", error)
    }

  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/orders');
  }

  useEffect(()=> {
    const fetchOrders = async () => {
      try{
        const responseOrders = await axios.get('http://127.0.0.1:5000/orders');
        orders = [responseOrders.data];
      } catch(error){
        console.error('Error fetching orders:', error)
      }
    };
    fetchOrders()
  },[deleteOrder])

  console.log(orders)

  return (

    <Container>

      <Row>

        <Col>
          <h3>Orders:</h3>
          <ListGroup>
            {orders.map(order => (
              <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center">
                ID: {order.id} <br />
                Order Date: {order.order_date} <br />
                Delivery Date: {order.delivery_date} <br />
                Customer ID: {order.customer_id} <br />
                <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Details</Button>
                
                <div>
                  <Button variant="warning" onClick={() => navigate(`/order-form/${order.id}`)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => deleteOrder(order.id)}>Delete</Button>
                </div>
              </ListGroupItem> ))}

          </ListGroup>

        </Col>

      </Row>

      <Modal show={showSuccessModal} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            Success
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Order has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  );
};

OrdersList.propTypes = {
  orders: array
}

export default OrdersList;