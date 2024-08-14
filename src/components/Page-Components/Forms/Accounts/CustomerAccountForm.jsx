import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner, Container } from "react-bootstrap";
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
    <Container>

      <Form onSubmit={handleSubmit} id="add-customer-account-form">

      <h3>{id ? 'Edit:': 'Add:'}</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="accountUserName">
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

        <Form.Group controlId="accountPassword">
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

        <Form.Group controlId="accountCustomerId">
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

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
        </Button>

      </Form>

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

    </Container>
  );

};

CustomerAccountForm.propTypes = {
  selectedCustomerAccount: object,
  onCustomerAccountUpdated: func
}

export default CustomerAccountForm;