import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner, Col, Row } from "react-bootstrap";
import { object,func } from "prop-types";
import axios from "axios";

const CustomerAccountForm = () => {
  const [customerAccount, setCustomerAccount] = useState({username:'', password:'', customer_id: ''});
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
       axios.get(`http://127.0.0.1:5000/customer_accounts/${id}`)
      .then(response => {
        setCustomerAccount(response.data);
      })
      .catch (error => setErrorMessage(error.message))
    }
  }, [id]);

  const validateForm = () => {
    let errors = {};
    if (!customerAccount.username) errors.username = 'Username is required';
    if (!customerAccount.password) errors.password = 'Password is required';
    if (!customerAccount.customer_id) errors.customer_id = 'Customer ID is required';
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
      try {
        if(id){
          await axios.put(`http://127.0.0.1:5000/customer_accounts/${id}`, customerAccount);
        } else {
          await axios.post('http://127.0.0.1:5000/customer_accounts',customerAccount);
        }
        setShowSuccessModal(true);
      } catch(error){
        setErrorMessage(error.message);
      } finally{
        setSubmitting(false);
      }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCustomerAccount(prevCustomerAccount => ({
      ...prevCustomerAccount, [name]: value
    }));
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setCustomer({username: '', password: '', customer_id: ''});
    setSubmitting(false);
    navigate('/customer-accounts'); 
  }

  if(submitting) return <p>Submitting Customer data...</p>;

  return (
    <>
      <Col className="bg-info p-3 rounded m-3">
        <Row className="bg-primary m-2 p-3 rounded">
          <Form onSubmit={handleSubmit} id="add-customer-account-form" >

          <h3 className="mt-3">{id ? 'Edit Account:': 'Create Account:'}</h3>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Col className="p-3 bg-dark rounded text-light">
            <Row className="p-1 m-1">
              <Form.Group controlId="accountUserName" className="p-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                type="text"
                name="username"
                value={customerAccount.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>  
            </Row>

            <Row className="p-1 m-1">
              <Form.Group controlId="accountPassword" className="p-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="text"
                name="password"
                value={customerAccount.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="p-1 m-1">
              <Form.Group controlId="accountCustomerId" className="p-3">
                <Form.Label>Customer ID:</Form.Label>
                <Form.Control 
                type="number"
                name="customer_id"
                value={customerAccount.customer_id}
                onChange={handleChange}
                isInvalid={!!errors.customer_id}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customer_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

          </Col>

            <div className="mt-3">
            <Button variant="danger" type="submit" disabled={submitting}>
              {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
            </Button>
            </div>

          </Form>
        </Row>
      </Col>
      <Modal show={showSuccessModal} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            Success
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Customer Account has been successfully {id ? 'updated': 'added'}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );

};

CustomerAccountForm.propTypes = {
  selectedCustomerAccount: object,
  onCustomerAccountUpdated: func
}

export default CustomerAccountForm;