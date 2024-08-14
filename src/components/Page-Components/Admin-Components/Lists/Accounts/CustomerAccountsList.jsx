import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array } from 'prop-types';
import { useNavigate } from "react-router-dom";

const CustomerAccountsList = ({accounts}) => {
  const navigate = useNavigate();
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
        accounts = [responseCustomersAccount.data];
      } catch(error){
        console.error('Error fetching customers account:', error)
      }
    };
    fetchCustomersAccount()
  },[deleteCustomerAccount])

  return (

    <Container>

      <Row>

        <Col>
          <h3>Customer Accounts:</h3>
          <ListGroup>
            {accounts.map(account => (
              <ListGroupItem key={account.id} className="d-flex justify-content-between align-items-center">
                Account ID: {account.id} <br />
                Username: {account.username} <br />
                <div>
                  <Button variant="primary" onClick={() => navigate(`/customer-account-details/${account.customer_id}`)} className="me-2">Details</Button>
                  <Button variant="warning" onClick={() => navigate(`/customer-account-form/${account.id}`)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => deleteCustomerAccount(account.id)}>Delete</Button>
                </div>
              </ListGroupItem>))}

          </ListGroup>

        </Col>

      </Row>

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

    </Container>
  );
};

CustomerAccountsList.propTypes = {
  accounts: array
}

export default CustomerAccountsList;




