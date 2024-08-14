import axios from "axios";
import { useState, useEffect } from 'react';
import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { array,object } from 'prop-types';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const CustomerProductList = ({products}) => {
  // const [searchParams, setSearchParams] = useSearchParams({n:''});
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const id = useParams();
  const [cart,setCart] = useState({customer_id:'',products:[]})

  const addProduct = (productId) => {
    let x = [...cart.products]
    console.log(x.forEach(y => {
      y
    }))
      setCart({customer_id:(id),products:[...cart.products,
        {product_id: (productId), quantity:(1)}
      ]});
      setShowSuccessModal(true);
  };

  const handleClose = () => {
    setShowSuccessModal(false);
  }

  console.log(cart)

  return (

    <Container>

      <Row>

        <Col>
          <h3>Products:</h3>
          <ListGroup>
            {products.map(product => (
              <ListGroupItem key={product.id} className="d-flex justify-content-between align-items-center">
                {product.name} (ID: {product.id}) <br />
                <Button variant="primary" onClick={() => navigate(`/product-details/${product.id}`)} className="me-2">Details</Button>
                <Button variant="warning" type="button" onClick={() => addProduct(product.id)}>Add to Cart</Button>

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
          Product has been successfully add to your cart.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  );
};

CustomerProductList.propTypes = {
  params: object,
  products: array
}

export default CustomerProductList;