import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [products,setProducts]= useState([]);

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
  };

  useEffect(()=> {
    const fetchProducts = async () => {
      try{
        const responseProducts = await axios.get('http://127.0.0.1:5000/products');
        setProducts(responseProducts.data);
      } catch(error){
        console.error('Error fetching products:', error)
      }
    };
    fetchProducts()
  },[deleteProduct]);

  return (
    <>

      <Col className="m-2  p-3 rounded">

        <Row className="bg-info p-3 rounded">
          <h3>Products:</h3>
          <ListGroup className=" bg-primary my-3 p-2">
            {products.map(product => (
              <ListGroupItem key={product.id} className="d-flex justify-content-between align-items-center my-1 rounded p-3">
                {product.name} (ID: {product.id}) <br />
                
                <div className="my-2">
                  <Col>
                    <Row className="m-2">
                      <Button variant="primary" onClick={() => navigate(`/product-details/${product.id}`)} className="me-2">Details</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="warning" onClick={() => navigate(`/product-form/${product.id}`)} className="me-2">Edit</Button>
                    </Row>
                    <Row className="m-2">
                      <Button variant="danger" onClick={() => deleteProduct(product.id)} className="me-2">Delete</Button>
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
          Product has been successfully deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </>
  );
};

export default ProductList;