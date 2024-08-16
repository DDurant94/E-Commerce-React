// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, Button, Alert, Modal, Spinner, Container } from "react-bootstrap";
// import { object,func } from "prop-types";
// import axios from "axios";

// const OrderForm = () => {
//   const [order, setOrder] = useState({customer_id:'',products:[{product_id:'',quantity:''}]});
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//        axios.get(`http://127.0.0.1:5000/orders/${id}`)
//       .then(response => {
//         setOrder(response.data);
//       })
//       .catch (error => setErrorMessage(error.message))
//     }
//   }, [id]);

//   const validateForm = () => {
//     let errors = {};
//     if (!order.product.name) errors.product = 'Product name is required is required';
//     if (!order.quantity) errors.quantity = 'Quantity can not be 0';
//     if (!order.customer_id) errors.customer_id = 'Customer ID is required';
//     setErrors(errors)
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;
//     setSubmitting(true);
//       try {
//         if(id){
//           await axios.put(`http://127.0.0.1:5000/orders/${id}`, order);
//         } else {
//           await axios.post('http://127.0.0.1:5000/orders',order);
//         }
//         setShowSuccessModal(true);
//       } catch(error){
//         setErrorMessage(error.message);
//       } finally{
//         setSubmitting(false);
//       }
//   };

//   const handleChange = (index,event) => {
//     const {name, value} = event.target;
//     setOrder(prevOrder => ({
//       ...prevOrder, [product.name]: value
//     }));
//   };

//   const handleClose = () => {
//     setShowSuccessModal(false);
//     // setOrder({product.name: '', product.quantity: ''});
//     setSubmitting(false);
//     navigate('/customer-accounts'); 
//   }

//   if(submitting) return <p>Submitting Customer data...</p>;

//   return (
//     <Container>

//       <Form onSubmit={handleSubmit} id="add-customer-account-form">

//       <h3>{id ? 'Edit:': 'Add:'}</h3>
//       {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//       {order.map(item => {})}
//         <Form.Group controlId="">
//           <Form.Label>Customer ID:</Form.Label>
//           <Form.Control 
//           type="number"
//           name="customer_id"
//           value={}
//           onChange={handleChange}
//           isInvalid={!!errors.}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.}
//           </Form.Control.Feedback>
//         </Form.Group>  

//         <Form.Group controlId="">
//           <Form.Label>:</Form.Label>
//           <Form.Control 
//           type="text"
//           name=""
//           value={}
//           onChange={handleChange}
//           isInvalid={!!errors.}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.password}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="">
//           <Form.Label>:</Form.Label>
//           <Form.Control 
//           type="number"
//           name=""
//           value={}
//           onChange={handleChange}
//           isInvalid={!!errors.}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={submitting}>
//           {submitting ? <Spinner as="span" animation="border" size="md"/>: 'Submit'}
//         </Button>

//       </Form>

//       <Modal show={showSuccessModal} onHide={handleClose}>

//         <Modal.Header closeButton>
//           <Modal.Title>
//             Success
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           Order has been successfully {id ? 'updated': 'added'}
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//         </Modal.Footer>

//       </Modal>

//     </Container>
//   );

// };

// OrderForm.propTypes = {
//   selectedOrder: object,
//   onOrderUpdated: func
// }

// export default OrderForm;