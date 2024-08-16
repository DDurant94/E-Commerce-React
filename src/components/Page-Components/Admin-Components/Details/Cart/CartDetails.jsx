import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const CartDetails = ({params}) => {
  const [customer, setCustomer] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [orderCart,setOrderCart] = useState({})


  useEffect(()=>{
    const fetchCustomerCart= async () =>{
      const id = params.id;
      try{
        if(id){
          const responseCart = await axios.get(`http://127.0.0.1:5000/carts_by_customer/${id}`);
          const responseCustomer = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
          setCart(responseCart.data);
          setCustomer(responseCustomer.data);
        }
      }catch(error){
        console.error("Error get info about customer or cart:", error)
      }
    };
    fetchCustomerCart();
  },[params || deleteCart])

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

  const submitOrder = async () =>{
    let customerId = cart.customer_id;
    let products = cart.items;
    setOrderCart({customer_id:customerId,products:products});
    console.log(orderCart)

  }

  const total = (cart) => {
    let cost = 0;
    cart.map(info => info.items.map(price => cost+=(price.price*price.quantity)))
    return cost
  };
  console.log(cart)
  return (
    <Container>
      <Col>
        <Row>
          <ListGroup>
            <h2>Cart Information</h2>
            <ListGroupItem>
              <h3>{customer.name}</h3>
              ID #: {customer.id} <br />
              <h4>Cart details</h4>
              <ListGroup>
              {cart.map(info => (
                <ListGroupItem key={info.cart_id}>
                  <h5>Items</h5>
                  <ListGroup>
                    {info.items.map(item => (
                      <ListGroupItem key={item.product_id}>
                        Name: {item.name} <br />
                        Price: {item.price} <br />
                        Quantity: {item.quantity} <br />
                        <div>
                          <Button variant="warning"  className="me-2">Edit</Button>
                          <Button variant="danger"  onClick={() => deleteCart(info.cart_id)} className="me-2">Remove</Button>
                        </div>
                        
                      </ListGroupItem>
                    ))}
                    
                  </ListGroup>
                </ListGroupItem>))}
                Subtotal: ${total(cart).toFixed(2)} <br />
                <div>
                  <Button variant="primary" onClick={() => navigate(`/carts`)} className="me-2">Carts</Button>
                  <Button variant="danger" onClick={()=> submitOrder()} className="me-2">Check out</Button>
                  <Button variant="warning" className="me-2">Edit</Button>
                </div>
              </ListGroup>

            </ListGroupItem>
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
        Cart has been successfully deleted.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>
    </Container>
  );
};

CartDetails.propTypes = {
  params:object
};

export default CartDetails;