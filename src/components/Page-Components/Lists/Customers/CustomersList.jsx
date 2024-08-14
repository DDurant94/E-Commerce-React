import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array } from 'prop-types';
import { useNavigate } from "react-router-dom";

const CustomerList = ({customers}) => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const deleteCustomer = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
      setShowSuccessModal(true);
    } catch (error){
      console.error("Error deleting customer:", error)
    }

  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/customers');
  }

  useEffect(()=> {
    const fetchCustomers = async () => {
      try{
        const responseCustomers = await axios.get('http://127.0.0.1:5000/customers');
        customers = [responseCustomers.data];
      } catch(error){
        console.error('Error fetching customers:', error)
      }
    };
    fetchCustomers();
  },[deleteCustomer])


  return (

    <Container>

      <Row>

        <Col>
          <h3>Customers:</h3>
          <ListGroup>
            {customers.map(customer => (
              <ListGroupItem key={customer.id} className="d-flex justify-content-between align-items-center">
                {customer.name} (ID: {customer.id})
                <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.id}`)} className="me-2">Details</Button>
                <div>
                  <Button variant="warning" onClick={() => navigate(`/customer-form/${customer.id}`)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                </div>
              </ListGroupItem> ))}

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
          Customer has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  );
};

CustomerList.propTypes = {
  customers: array
}

export default CustomerList;