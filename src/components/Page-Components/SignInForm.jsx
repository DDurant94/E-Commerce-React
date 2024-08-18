import { useState } from "react";
import { useNavigate,  } from "react-router-dom";
import { func } from "prop-types";
import { Form, Button, Alert, Modal, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";

const SignIn = () => {
  const [accountForm, setAccountForm] = useState({username:'',password:''});
  const [account, setAccount] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const fetchingAccount = async ()=> {
    try{
      const response = await axios.get(`http://127.0.0.1:5000/customer_accounts/by_customer_username/${accountForm.username}`);
      setAccount(response.data)
      if(response.data.username == accountForm.username && response.data.password == accountForm.password){
        setShowSuccessModal(true);
        setSubmitting(false);
      } else {
        setErrorMessage("Invalid Username or Password")
      }
    } catch(error){
      console.error("Error getting accounts",error);
      setErrorMessage("Invalid Username or Password")
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!accountForm.username) errors.username = 'Invalid Username';
    if (!accountForm.password) errors.password = 'Invalid password';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    console.log(1)
    fetchingAccount();
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setAccountForm(prevValue => ({
      ...prevValue,[name]: value
    }));
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setAccountForm({username: '', password:''});
    setSubmitting(false);
    navigate(`/${account.customer_id}`); 
  };


  if(submitting) return <p>Signing In...</p>;
  return (
    <>
      <Col className="m-5 p-5">
        <Row>
          <Form onSubmit={handleSubmit} id="signIn-form">

            <h1>Sign-In</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Col className="border border-primary bg-secondary-subtle text-white p-4 rounded shadow">
              <Row className="my-3 p-3 border border-primary rounded">
                <Form.Group controlId="accountUserName">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                  type="text"
                  name="username"
                  value={accountForm.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="my-3 p-3 border border-primary rounded">
                <Form.Group controlId="accountPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                  type="text"
                  name="password"
                  value={accountForm.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="my-3 p-3">
                <div className="mt-3">
                <Button variant="primary" type="submit" disabled={submitting} className="me-2">
                  {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
                </Button>

                <Button variant="secondary" onClick={() => navigate(`/customer-account-form`)} className="me-2">
                  Create Account
                </Button>

                <Button variant="warning" onClick={() => navigate(`/`)} className="me-2">
                  Skip
                </Button>
                </div>
              </Row>
            </Col>
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
        {account.username} has been successfully logged In!
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>

      
    </>
  );
};

SignIn.propTypes = {
  onSignInUpdated: func
}

export default SignIn;