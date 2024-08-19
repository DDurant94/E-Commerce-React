import axios from "axios";
import { useState, useEffect } from 'react';
import  { Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerAccountsList = () => {
  const navigate = useNavigate();
  const [accounts,setAccounts] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const deleteCustomerAccount = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/customer_accounts/${id}`);
      setShowSuccessModal(true);
    } catch (error){
      console.error("Error deleting customer:", error)
    }

  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/customer_accounts');
  }

  useEffect(()=> {
    const fetchCustomersAccount = async () => {
      try{
        const responseCustomersAccount = await axios.get('http://127.0.0.1:5000/customer_accounts');
        setAccounts(responseCustomersAccount.data);
      } catch(error){
        console.error('Error fetching customers account:', error)
      }
    };
    fetchCustomersAccount()
  },[deleteCustomerAccount])

  return (

    <>

      <Col className="m-2  p-3 rounded">

        <Row className="bg-info p-3 rounded">
          <h3>Customer Accounts:</h3>
          <ListGroup className=" bg-primary my-3 p-3">
            {accounts.map(account => (
              <ListGroupItem key={account.id} className="d-flex justify-content-between align-items-center my-1 rounded">
                Account ID: {account.id} <br />
                Username: {account.username} <br />
                <div>
                  <Col>
                    <Row className="m-2">
                      <Button variant="primary" onClick={() => navigate(`/customer-account-details/${account.customer_id}`)} className="me-2">Details</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="warning" onClick={() => navigate(`/customer-account-form/${account.id}`)} className="me-2">Edit</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="danger" onClick={() => deleteCustomerAccount(account.id)} className="me-2">Delete</Button>
                    </Row>
                  </Col>
                </div>
              </ListGroupItem>))}

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
          Customer account has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );
};

export default CustomerAccountsList;




