import  { Button, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const AccountDetails = ({params}) => {
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

  const displayCustomerAccount = () => {
    if (orders.message == 'Not Found'){
      return (
        <ListGroupItem>
          <h4>Account Information</h4>
          <ListGroupItem>
            <Col className="m-2">
              <Row className="p-2 m-2 border border-info-subtle rounded">
                <div>
                  Account #: {customerAccount.id}  
                </div>
              </Row>
              <Row className="p-2 m-2 border border-info-subtle rounded">
                <div>
                  Username: {customerAccount.username}
                </div>
              </Row>
              <Row className="p-2 m-2 border border-info-subtle rounded">
                <div>
                  Password: {customerAccount.password}
                </div>
              </Row>
            </Col>
          </ListGroupItem>
          <h4>Order Information</h4>
          <ListGroupItem>
            <div className="m-2 p-2 border border-info-subtle rounded">
              Orders: None
            </div>
          </ListGroupItem>
        <div className="my-3">
          <Button variant="primary" onClick={() => navigate(`/customer-accounts`)} className="me-2">Accounts</Button>
          <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.id}`)} className="me-2">Customer</Button>
        </div>
      </ListGroupItem>
      )} else{
        return (
          <ListGroupItem>
            <h4>Account Information</h4>
            <ListGroupItem className="border border-primary rounded">
              <Col className="m-2">              
                <Row className="p-2 m-2 border border-info-subtle rounded">
                  <div>
                    Account #: {customerAccount.id}
                  </div>
                </Row>
                <Row className="p-2 m-2 border border-info-subtle rounded">
                  <div>
                    Username: {customerAccount.username}
                  </div>
                </Row>
                <Row className="p-2 m-2 border border-info-subtle rounded">
                  <div>
                    Password: {customerAccount.password}
                  </div>
                </Row>
            </Col>
            </ListGroupItem>
              <h4>Order Information</h4>
              {orders.map(order => (
              <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center border border-primary rounded">
                <Col className="m-2">
                  <Row className="p-2 m-2 border border-info-subtle rounded">
                    <div>
                      Order #: {order.id}
                    </div>
                  </Row>
                  <Row className="p-2 m-2 border border-info-subtle rounded">
                    <div>
                      Order Date: {order.order_date}
                    </div>
                  </Row>
                  <Row className="p-2">
                    <div>           
                      <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Order Details</Button>
                    </div>
                  </Row>
                </Col>
          </ListGroupItem>))}
          <div className="my-3">
            <Button variant="primary" onClick={() => navigate(`/customer-accounts`)} className="me-2">Accounts</Button>
            <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.id}`)} className="me-2">Customer</Button>
          </div>
          </ListGroupItem>
        )}
  };

  return (
    <>
      <Col className="m-4 p-3">
        <Row className="bg-primary p-2 rounded shadow">
          <ListGroup>
            <ListGroupItem key={customer.id} className="mb-3">
              <Col className="p-3 border border-primary rounded">
                <Row className="mb-2">
                  <div>
                    <h3>{customer.name} (ID#: {customer.id}):</h3>
                  </div>
                </Row>
                <Row className="m-2 p-2 border border-info-subtle rounded">
                  <div>
                    Email: ${customer.email} 
                  </div>
                </Row>
                <Row className="m-2 p-2 border border-info-subtle rounded">
                  <div>
                    Phone Number: {customer.phone}
                  </div>
                </Row>
              </Col>
            </ListGroupItem>

            {displayCustomerAccount()}
            
          </ListGroup>
        </Row>
      </Col>

    </>
  );

};

AccountDetails.propTypes = {
  params: object
}

export default AccountDetails;