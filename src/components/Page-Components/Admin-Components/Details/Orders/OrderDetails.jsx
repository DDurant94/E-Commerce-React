import  { Container, Button, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const OrderDetails = ({params}) => {
  const [orderData, setOrderData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    const fetchOrder = async () => {
      const id = params.id;
      try{
        if(id){
          const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`)
          setOrderData(response.data);
          setCustomer(response.data.customer);
          setProducts(response.data.products);
        }

      } catch(error){
        console.error('Error getting order details:', error)
      }
    }
    fetchOrder()
  },[params]);

  const totalOrderPrice = (products) => {
    let total = 0;
    products.map(product => total += (product.price * product.quantity))
    let tax = total *.09;
    return (tax + total).toFixed(2);
  };

  return (
    <Container>
      <Row>
        <Col>
        <ListGroup >
          <h3>Order Details:</h3>
          <ListGroupItem key={orderData.id} className="d-flex justify-content-between align-items-center">
          Order ID#: {orderData.order_id} <br />
          Customer Name: {customer.name} (ID: {customer.customer_id}) <br />
          Email: {customer.email} <br />
          Phone Number: {customer.phone} <br />
          Order Date: {orderData.order_date} <br />
          Delivery Date: {orderData.delivery_date}

          </ListGroupItem>

        </ListGroup> 
        <ListGroup>
          <h4>Products:</h4>
          {products.map(product => 
          <ListGroupItem key={product.product_id} className="d-flex justify-content-between align-items-center">
              {product.name} (ID#: {product.product_id}) <br />
              Price: ${product.price} <br />
              Quantity: {product.quantity}
          </ListGroupItem>)}
        </ListGroup>
        Shipping: $0 <br />
        Total: ${totalOrderPrice(products)}
        </Col>
      </Row>

      <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.customer_id}`)} className="me-2">Customer</Button>
      <Button variant="primary" onClick={() => navigate(`/orders`)} className="me-2">Orders</Button>


    </Container>
    
  );

};

OrderDetails.propTypes = {
  params: object
}

export default OrderDetails;