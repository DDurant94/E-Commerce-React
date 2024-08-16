import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal,Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const CartDetails = ({params}) => {
  const [customer, setCustomer] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessModalOrder, setShowSuccessModalOrder] = useState(false);
  const navigate = useNavigate();


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
  },[params])

  const deleteCart = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/cart/${id}`);
      setShowSuccessModal(true);
      fetchCustomerCarts();
    } catch (error){
      console.error("Error deleting cart:", error)
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      customer_id: params.id,
      products: cart.map(items => (items.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })))),
    };
    console.log(orderData)
    try{
      const loopingCartProducts = async (order) => {
        for(let products of order.products){
          for(let product of products){
            try{
              let response = await axios.get(`http://127.0.0.1:5000/products/${product.product_id}`);
              let updatedProductData = {name:response.data.name,price:response.data.price,quantity: response.data.quantity - product.quantity,description:response.data.description};
              console.log(updatedProductData)
              await axios.put(`http://127.0.0.1:5000/products/${product.product_id}`,updatedProductData)
            } catch(error){
              console.error("Error updating products",error)
            }
          }
        };
        // for(let cartsInf of cart){
        //   try{
        //   await axios.delete(`http://127.0.0.1:5000/cart/${cartsInf.cart_id}`);
        // }catch(error){
        //   console.error("Error deleting carts",error)
        // }};
    };
    loopingCartProducts(orderData);
    await axios.post(`http://127.0.0.1:5000/orders`,orderData);
    setShowSuccessModalOrder(true);
    }catch(error){
      console.error("error posting order",error)
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/carts');
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCustomerId(prevCustomer => ({
      ...prevCustomer, [name]: value
    }));
  };

  const total = (cart) => {
    let cost = 0;
    cart.map(info => info.items.map(price => cost+=(price.price*price.quantity)))
    return cost
  };

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
                  <Button variant="warning" className="me-2">Edit</Button>
                </div>
              </ListGroup>

            </ListGroupItem>
          </ListGroup>
        </Row>

        <Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label><h4>Customer ID:</h4></Form.Label>
            <Form.Control
              type="number"
              name="customerId"
              value={customer.id}
              disabled
              onChange={handleChange}
             />
          </Form.Group>
          <div>
            <h4>Cart Items</h4>
            <ListGroup>
            {cart.map((items => (items.items.map((item,index) => 
              <ListGroupItem key={index}>
                {item.name} (Quantity: {item.quantity})
              </ListGroupItem>
            ))))}
            </ListGroup>
          </div>
          <Button variant="danger" type="submit" className="me-2" disabled={submitting}>
          {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Check Out'}
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
        Cart has been successfully deleted.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>

      <Modal show={showSuccessModalOrder} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {customer.name} your order has been places.
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