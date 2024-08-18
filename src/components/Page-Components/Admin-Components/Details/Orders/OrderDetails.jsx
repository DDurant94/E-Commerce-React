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
    <>
      <Col className="m-2 p-3">
        <Row className="p-2 m-2 bg-info rounded border border-black ">
          <ListGroup>
            <h3 className="mb-2 p-2">Order Details:</h3>
            <ListGroupItem key={orderData.id} className="d-flex justify-content-between align-items-center">
              <Col className="p-3 m-1 bg-secondary-subtle rounded border border-primary">
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Order ID#: {orderData.order_id}
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Customer Name: {customer.name} (ID: {customer.customer_id})
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Email: {customer.email}
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Phone Number: {customer.phone}
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Order Date: {orderData.order_date}
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-primary">
                  <div>
                  Delivery Date: {orderData.delivery_date}
                  </div>
                </Row>
              </Col>
            </ListGroupItem>

          </ListGroup> 
        </Row>
        <Row className="p-2 m-2 bg-info rounded border border-black ">
        <ListGroup>
          <h4 className="mb-2 p-2">Products:</h4>
          {products.map(product => 
          <ListGroupItem key={product.product_id} className="d-flex justify-content-between align-items-center my-2 rounded">
            <Col className="p-3 m-1 bg-secondary-subtle rounded border border-primary">
              <Row className="m-2 p-1 rounded-5 border border-light-subtle">
                <div>
                  {product.name} (ID#: {product.product_id})
                </div>
              </Row>
              <Row className="m-2 p-1 rounded-5 border border-light-subtle">
                <div>
                  Price: ${product.price}
                </div>
              </Row>
              <Row className="m-2 p-1 rounded-5 border border-light-subtle">
                <div>
                  Quantity: {product.quantity}
                </div>
              </Row>
            </Col>
          </ListGroupItem>)}
            <ListGroupItem className="d-flex justify-content-between align-items-center my-2 rounded">
              <Col className="p-3 m-1 bg-secondary-subtle rounded border border-primary">
                <Row className="m-2 p-1 rounded-5 border border-danger-subtle">
                  <div>
                    Shipping: $0
                  </div>
                </Row>
                <Row className="m-2 p-1 rounded-5 border border-danger-subtle">
                  <div>
                    Total: ${totalOrderPrice(products)}
                  </div>
                </Row>
              </Col>
            </ListGroupItem>
          </ListGroup>

        </Row>
        <Row className="p-2 m-2 bg-info rounded border border-black ">
          <div className="bg-dark p-3 rounded">
            <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.customer_id}`)} className="me-2">Customer</Button>
            <Button variant="primary" onClick={() => navigate(`/orders`)} className="me-2">Orders</Button>
          </div>
        </Row>
      </Col>

    </>
    
  );

};

OrderDetails.propTypes = {
  params: object
}

export default OrderDetails;