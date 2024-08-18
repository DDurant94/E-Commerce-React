import axios from "axios";
import { useState, useEffect } from 'react';
import  { Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const navigate = useNavigate();
  const [orders,setOrders]= useState([]);
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
        setOrders(responseOrders.data);
      } catch(error){
        console.error('Error fetching orders:', error)
      }
    };
    fetchOrders()
  },[])


  return (

    <>

      <Col className="m-2  p-3 rounded">

        <Row className="bg-info p-3 rounded">
          <h3>Orders:</h3>
          <ListGroup className=" bg-primary my-3 p-2">
            {orders.map(order => (
              <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center my-1 rounded p-3">
                ID: {order.id} <br />
                Order Date: {order.order_date} <br />
                Delivery Date: {order.delivery_date} <br />
                Customer ID: {order.customer_id} <br />
                <div className="my-2">
                  <Col>
                    <Row className="m-2">
                      <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)} className="me-2">Details</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="warning" onClick={() => navigate(`/order-form/${order.id}`)} className="me-2">Edit</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="danger" onClick={() => deleteOrder(order.id)} className="me-2">Delete</Button>
                    </Row>
                  </Col>
                </div>
              </ListGroupItem> ))}

          </ListGroup>

        </Row>

      </Col>

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

    </>
  );
};

export default OrdersList;