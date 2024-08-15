import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array } from 'prop-types';
import { useNavigate } from "react-router-dom";

const ProductList = ({products}) => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const deleteProduct = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:5000/products/${id}`);
      setShowSuccessModal(true);
    } catch (error){
      console.error("Error deleting product:", error)
    }

  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate('/products');
  }

  useEffect(()=> {
    const fetchProducts = async () => {
      try{
        const responseProducts = await axios.get('http://127.0.0.1:5000/products');
        products = [responseProducts.data];
      } catch(error){
        console.error('Error fetching products:', error)
      }
    };
    fetchProducts()
  },[deleteProduct])

  return (

    <Container>

      <Row>

        <Col>
          <h3>Products:</h3>
          <ListGroup>
            {products.map(product => (
              <ListGroupItem key={product.id} className="d-flex justify-content-between align-items-center">
                {product.name} (ID: {product.id}) <br />
                
                <div>
                  
                  <Button variant="primary" onClick={() => navigate(`/product-details/${product.id}`)} className="me-2">Details</Button>
                  <Button variant="warning" onClick={() => navigate(`/product-form/${product.id}`)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
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
          Product has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  );
};

ProductList.propTypes = {
  products: array
}

export default ProductList;