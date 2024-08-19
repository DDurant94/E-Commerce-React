import axios from "axios";
import { useState, useEffect } from 'react';
import  { Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers,setCustomers] = useState([])
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
        setCustomers(responseCustomers.data);
      } catch(error){
        console.error('Error fetching customers:', error)
      }
    };
    fetchCustomers();
  },[deleteCustomer])


  return (

    <>

      <Col className="m-2  p-3 rounded">

        <Row className="bg-info p-3 rounded">
          <h3 className="m-2">Customers:</h3>
          <ListGroup className=" bg-primary my-3 p-2">
            {customers.map(customer => (
              <ListGroupItem key={customer.id} className="d-flex justify-content-between align-items-center my-1 rounded p-3">
                <div>
                {customer.name} (ID: {customer.id})
                </div>
                <div>
                  <Col>
                    <Row className="m-2">
                      <Button variant="primary" onClick={() => navigate(`/customer-details/${customer.id}`)} className="me-2">Details</Button>
                    </Row>

                    <Row className="m-2">
                      <Button variant="warning" onClick={() => navigate(`/customer-form/${customer.id}`)} className="me-2">Edit</Button>
                    </Row>

                    <Row className="m-2">
                      <Button variant="danger" onClick={() => deleteCustomer(customer.id)} className="me-2">Delete</Button>
                    </Row>
                  </Col>
                </div>
              </ListGroupItem> ))}

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
          Customer has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );
};

export default CustomerList;