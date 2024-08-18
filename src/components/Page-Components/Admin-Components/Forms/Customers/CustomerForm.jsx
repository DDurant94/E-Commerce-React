import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner, Col, Row } from "react-bootstrap";
import { object,func } from "prop-types";
import axios from "axios";

const AddCustomerForm = () => {
  const [customer, setCustomer] = useState({name:'', email:'', phone: ''});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/customers/${id}`)
      .then(response => {
        setCustomer(response.data);
      })
      .catch (error => setErrorMessage(error.message))
    }
  }, [id]);

  const validateForm = () => {
    let errors = {};
    if (!customer.name) errors.name = 'Name is required';
    if (!customer.email) errors.email = 'Email is required';
    if (!customer.phone) errors.phone = 'Phone is required';
    setErrors(errors)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
      try {
        if(id){
          await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
        } else {
          await axios.post('http://127.0.0.1:5000/customers',customer);
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
    setCustomer(prevCustomer => ({
      ...prevCustomer, [name]: value
    }));
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setCustomer({name: '', email: '', phone: ''});
    setSubmitting(false);
    navigate('/customers'); 
  }

  if(submitting) return <p>Submitting Customer data...</p>;

  return (
    <>
      <Col className="bg-info p-3 rounded m-3">
        <Row className="m-2">
          <Form onSubmit={handleSubmit} id="add-customer-form" className="bg-primary p-3 rounded">

          <h3 className="mt-3">{id ? 'Edit Customer:': 'Add Customer:'}</h3>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Col className="p-3 bg-dark rounded text-light">
            <Row className="p-1 m-1">
              <Form.Group controlId="customerName" className="p-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>  
            </Row>
            <Row className="p-1 m-1">
              <Form.Group controlId="customerEmail" className="p-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="p-1 m-1">
              <Form.Group controlId="customerPhone" className="p-3">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control 
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
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
          Customer has been successfully {id ? 'updated': 'added'}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );

};

AddCustomerForm.propTypes = {
  selectedCustomer: object,
  onCustomerUpdated: func
}

export default AddCustomerForm;

