import  { Button, Row, Col, ListGroup, ListGroupItem,} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const CustomerDetails = ({params}) => {
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
          <ListGroupItem className="p-4">
            <h4>Account Information</h4>
            <ListGroupItem className="rounded border border-info-subtle bg-black m-2 p-3">
              <Col>
                <Row className="m-2 p-2 border rounded border-info">
                  <div>
                    <h5>Account #: {customerAccount.id}</h5>
                  </div>
                </Row>
                <Row className="mb-2 p-2">
                  <div>
                    <Button variant="primary" onClick={() => navigate(`/customer-account-details/${customerAccount.customer_id}`)} className="me-2">Account</Button>  
                  </div>
                </Row>
              </Col>
            </ListGroupItem>
            <h4>Order Information</h4> 
            <ListGroupItem className="rounded border border-info-subtle bg-black m-2 p-3">
              Orders: None
            </ListGroupItem>
            <div className="mt-3">
              <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
            </div>
          </ListGroupItem>
        )} else{
          return (
            <ListGroupItem className="p-4">
             
              <h4>Account Information</h4>
              <ListGroupItem className="rounded border border-info-subtle bg-black m-2 p-3">
                <Col>
                  <Row className="m-2 p-2 border rounded border-info">
                    <div>
                      <h4>Account #: ({customerAccount.id})</h4>
                    </div>
                  </Row>
                  <Row className="mb-2 p-2">
                    <div>
                      <Button variant="primary" onClick={() => navigate(`/customer-account-details/${customerAccount.customer_id}`)} className="me-2">Account Details</Button>
                    </div>
                  </Row>
                </Col>
             </ListGroupItem>
              <h4>Order Information</h4>

              {orders.map(order => (
              <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center rounded border border-info-subtle bg-black m-2 p-3">
                <Col className="m-2 p-2">
                  <Row className="my-3 p-1 border border-info rounded">
                    <div>
                      Order #: {order.id}
                    </div>
                  </Row>
                  <Row className="my-3 p-1 border border-info rounded">
                    <div>
                      Order Date: {order.order_date} 
                    </div>
                  </Row>
                  <Row className="my-2">
                    <div>
                      <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Order Details</Button>
                    </div>
                  </Row>
                </Col>
              </ListGroupItem>))}
            <div className="mt-3">
              <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
            </div>
            </ListGroupItem>
          )}
    } else {
      if(orders.message == 'Not Found'){
        return (
        <ListGroupItem className="p-4">
          <h4>Account Information</h4>
          <ListGroupItem className="rounded border border-info-subtle bg-black">
            No account associated with {customer.name}
          </ListGroupItem>
          <h4>Order Information</h4>
          <ListGroupItem className="rounded border border-info-subtle bg-black">
            Orders: None <br />
          </ListGroupItem>
          <div className="mt-3">
          <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
          </div>
        </ListGroupItem>
        )
      } else {
      return (
        <ListGroupItem className="p-4">
          <h4>Account Information</h4>
          <ListGroupItem className="rounded border border-info-subtle bg-black">
            No account associated with {customer.name}
          </ListGroupItem>
          <h4>Order Information</h4>
          {orders.map(order => (
              <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center rounded border border-info-subtle bg-black m-2 p-3">
                <Col className="m-2 p-2">
                  <Row className="my-3 p-1 border border-info rounded">
                    <div>
                      Order #: {order.id}
                    </div>
                  </Row>
                  <Row className="my-3 p-1 border border-info rounded">
                    <div>
                      Order Date: {order.order_date} 
                    </div>
                  </Row>
                  <Row className="my-2">
                    <div>
                      <Button variant="primary" onClick={() => navigate(`/order-details/${order.id}`)}>Order Details</Button>
                    </div>
                  </Row>
                </Col>
              </ListGroupItem>))}
            <div className="mt-3">
              <Button variant="primary" onClick={() => navigate(`/customers`)} className="me-2">Customers</Button>
            </div>
            </ListGroupItem>

      )
        }
    }
  };

  return (
    <>
      <Col className="m-5">
        <Row>
          <h1>Customer {customer.name} Information:</h1>
          <ListGroup>
            <Col>
              <Row className="m-2 rounded border border-info-subtle shadow">
                <ListGroupItem key={customer.id}>
                  <Col className="p-3 m-1">
                    <Row className="p-2 m-2 border border-primary rounded-3 bg-black">
                      <div>
                        <h3>{customer.name} (ID#: {customer.id}):</h3>
                      </div>
                    </Row>
                    <Row className="p-2 m-2 border border-primary rounded-3 bg-black">
                      <div>
                        Email: ${customer.email}
                      </div>
                    </Row>
                    <Row className="p-2 m-2 border border-primary rounded-3 bg-black">
                      <div>
                        Phone Number: {customer.phone}
                      </div>
                    </Row>
                  </Col>
                </ListGroupItem>
              </Row>
              <Row className="m-2 rounded border border-info-subtle shadow">
                {displayCustomerAccount()}
              </Row>
            </Col>
          </ListGroup>
        </Row>
      </Col>
    </>
  );

};

CustomerDetails.propTypes = {
  params: object
}

export default CustomerDetails;