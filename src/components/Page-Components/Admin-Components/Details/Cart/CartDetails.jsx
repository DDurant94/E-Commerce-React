import  { Button, Row, Col, ListGroup, ListGroupItem, Modal,Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const CartDetails = ({params}) => {
  const [customer, setCustomer] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessModalOrder, setShowSuccessModalOrder] = useState(false);
  const [showSuccessModalUpdate, setShowSuccessModalUpdate] = useState(false);
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
          setCartItems(responseCart.data.map(items => items.items).flat())
        }
      }catch(error){
        console.error("Error get info about customer or cart:", error)
      }
    };
    fetchCustomerCart();
  },[params||deleteCart])

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
      customer_id: customer.id,
      products: cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };
    try{
      const loopingCartProducts = async (order) => {
        for(let product of order.products){
            try{
              let response = await axios.get(`http://127.0.0.1:5000/products/${product.product_id}`);
              let updatedProductData = {name:response.data.name,price:response.data.price,quantity: response.data.quantity - product.quantity,description:response.data.description};
              await axios.put(`http://127.0.0.1:5000/products/${product.product_id}`,updatedProductData)
            } catch(error){
              console.error("Error updating products",error)
          }
        };
        for(let cartsInf of cart){
          try{
          await axios.delete(`http://127.0.0.1:5000/cart/${cartsInf.cart_id}`);
        }catch(error){
          console.error("Error deleting carts",error)
        }};
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

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCartItems = [...cartItems];
    updatedCartItems[index][name] = value;
    setCartItems(updatedCartItems);
  };

  const updateCart = async () => {
    for(let cartsInf of cart){
      try{
        console.log(cartsInf.cart_id)
      await axios.put(`http://127.0.0.1:5000/cart/${cartsInf.cart_id}`,cartsInf);
      setShowSuccessModalUpdate(true)
    }catch(error){
      console.error("Error deleting carts",error)
    }};

  };

  const total = (cart) => {
    let cost = 0;
    cart.map(info => cost+=(info.price*info.quantity))
    return cost
  };

  return (
    <>
      <Col className="m-2 p-3">

        <Row className="p-3">
          <ListGroup>
            <h2 className="mb-2 p-2">Cart Information:</h2>
            <ListGroupItem>
              <h3 className="mb-2 p-2">{customer.name}</h3>
              <Col className="p-4 bg-info text-dark rounded border border-primary">
                <Row className="m-2 p-1">
                  <div>
                    Customer ID #: {customer.id} <br />
                  </div>
                </Row>
                <Row className="m-2 p-1">
                  <div>
                    <h3>Cart details</h3>
                  </div>
                </Row>
                <Row className="border rounded bg-primary p-2">
                  <ListGroup className="">
                    <Col className="mx-1">
                      <Row className="p-4 rounded">
                      {cart.map(info => (
                        <ListGroupItem key={info.cart_id}>
                          <h5 className="mb-2 p-2">Items</h5>
                          <ListGroup>
                            {info.items.map(item => (
                              <ListGroupItem key={item.product_id}>
                                <Col className="m-2 p-3 bg-secondary-subtle rounded">
                                  <Row className="m-2 border border-primary rounded p-2">
                                    <div>
                                      Name: {item.name}
                                    </div>
                                  </Row>
                                  <Row className="m-2 border border-primary rounded p-2">
                                    <div>
                                      Price: {item.price}
                                    </div>
                                  </Row>
                                  <Row className="m-2 border border-primary rounded p-2">
                                    <div>
                                      Quantity: {item.quantity} <br />
                                    </div>
                                  </Row>
                                  <Row className="my-2 p-2">
                                    <div className="mt-2">
                                      <Button variant="danger"  onClick={() => deleteCart(info.cart_id)} className="me-2">Remove</Button>
                                    </div>
                                  </Row>
                                </Col>
                              </ListGroupItem>
                            ))}
                            
                          </ListGroup>
                        </ListGroupItem>))}
                      </Row>
                      <Row className="mx-3">
                        <div className="mb-4">
                          <Button variant="warning" onClick={() => navigate(`/carts`)} className="me-2">Carts</Button>
                        </div>
                      </Row>
                    </Col>
                  </ListGroup>
                </Row>
              </Col>
            </ListGroupItem>
          </ListGroup>
        </Row>

        <Row className="p-3">
        <ListGroup>
          <ListGroupItem>
              <Form onSubmit={handleSubmit}>
                <Col>
                  <Row>
                    <Form.Group>
                      <Form.Label><h4>Customer ID:</h4></Form.Label>
                      <Form.Control
                        type="number"
                        name="customerId"
                        value={customer.id}
                        disabled/>
                    </Form.Group>
                  </Row>
                  <Row>
                    <div>
                    <h4>Cart Items:</h4>
                      <ListGroup>
                        {cartItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Form.Group controlId={`product-${item.product_id}`}>
                            <Form.Label>{item.name}</Form.Label>
                            <Form.Control
                              type="number"
                              name="quantity"
                              value={item.quantity}
                              onChange={(e) => handleChange(e, index)}/>
                            Price: ${item.price}
                          </Form.Group>
                        </ListGroupItem>))}
                      </ListGroup>
                    </div>
                  </Row>
                  <Row>
                    <div>
                      Subtotal: ${total(cartItems).toFixed(2)}
                    </div>
                  </Row>
                  <Row>
                    <div className="mt-2">
                      <Button variant="danger" type="submit" className="me-2" disabled={submitting}>
                      {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Check Out'}
                      </Button>
                      <Button variant="warning" onClick={() => updateCart()} className="me-2">Update</Button>
                      <Button variant="primary" onClick={() => navigate(`/carts`)} className="me-2">Carts</Button>
                    </div>
                  </Row>
                </Col>
              </Form> 
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
        Item has been successfully deleted.
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

      <Modal show={showSuccessModalUpdate} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          Success
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {customer.name} your item has been updated.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>
    </>
  );
};

CartDetails.propTypes = {
  params:object
};

export default CartDetails;