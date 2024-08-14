import  { Container, Button, Row, Col, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { object } from "prop-types";

const ProductDetails = ({params}) => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const id = params.id;
      try{
        if(id){
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`)
          setProduct(response.data);
        }
      } catch(error){
        console.error('Error getting product details:', error)
      }
    }
    fetchProduct()
  },[params]);

  console.log(product.description)
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem key={product.id}>
              <h3>{product.name}:</h3>
              Price: ${product.price} <br />
              Quantity: {product.quantity} In Stock <br />
              Description: {product.description} <br />
              <Button variant="primary" onClick={() => navigate(`/products`)} className="me-2">Products</Button>

            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

    </Container>
  );

};

ProductDetails.propTypes = {
  params: object
}

export default ProductDetails;