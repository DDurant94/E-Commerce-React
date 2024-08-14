import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const UserCustomerDetails = ({params}) => {
  const [customer, setCustomer] = useState([]);
  const [customerAccount, setCustomerAccount] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      const id = params.id;
      try{
        if(id){
          const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
          const responseAccounts = await axios.get(`http://127.0.0.1:5000/customer_accounts/by_customer_id/${id}`);
          const responseOrders = await axios.get(`http://127.0.0.1:5000/orders/by_customer_id/${id}`);
          setCustomer(response.data);
          setOrders(responseOrders.data);
          setCustomerAccount(responseAccounts.data);
        }
      } catch(error){
        console.error('Error getting customer details:', error)
      }
    }
    fetchCustomer()
  },[params]);

  const displayCustomerAccount = () =>{
    if(customerAccount.message != 'Not Found'){
      if (orders.message == 'Not Found'){
        return (
          <ListGroupItem>
            <h4>Account Information</h4>
            <ListGroupItem>
              Account #: {customerAccount.id} <br />
              <div>
              <Button variant="primary" onClick={() => navigate(`/customer-account-details/${customerAccount.customer_id}`)} className="me-2">Account</Button>  
              </div>
            </ListGroupItem>
            <h4>Order Information</h4> 
            <ListGroupItem>
              Orders: None
            </ListGroupItem>
            <div>
              <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
            </div>
          </ListGroupItem>
        )} else{
          return (
            <ListGroupItem>
              <h4>Account Information</h4>
              <ListGroupItem>
            <h4>Account #: ({customerAccount.id})</h4>
            <div>
            <Button variant="primary" onClick={() => navigate(`/customer-account-details/${customerAccount.customer_id}`)} className="me-2">Account Details</Button>
            </div>
            </ListGroupItem>
            <h4>Order Information</h4> 
            {orders.map(order => (<ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center">
              Order #: {order.id} <br />
              Order Date: {order.order_date} <br />  
              <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Order Details</Button> <br />
            </ListGroupItem>))} <br />
            <div>
              <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
            </div>
            </ListGroupItem>
          )}
    } else {
      if(orders.message == 'Not Found'){
        return (
        <ListGroupItem>
          <h4>Account Information</h4>
          <ListGroupItem>
            No account associated with {customer.name}
          </ListGroupItem>
          <h4>Order Information</h4>
          <ListGroupItem>
            Orders: None <br />
          </ListGroupItem>
          <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
        </ListGroupItem>
        )
      } else {
      return (
        <ListGroupItem>
          <h4>Account Information</h4>
          <ListGroupItem>
            No account associated with {customer.name}
          </ListGroupItem>
          <h4>Order Information</h4>
        {orders.map(order => (<ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center">
          Order #: {order.id} <br />
          Order Date: {order.order_date} <br />
          <div>
            <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Order Details</Button> <br />
          </div>
        </ListGroupItem>))} <br />
        <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
        </ListGroupItem>

      )
        }
    }
  };


  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem key={customer.id}>
              <h3>{customer.name} (ID#: {customer.id}):</h3>
              Email: ${customer.email} <br />
              Phone Number: {customer.phone} <br />
            </ListGroupItem>
            {displayCustomerAccount()}
            
          </ListGroup>
        </Col>
      </Row>

    </Container>
  );

};

UserCustomerDetails.propTypes = {
  params: object
}

export default UserCustomerDetails;