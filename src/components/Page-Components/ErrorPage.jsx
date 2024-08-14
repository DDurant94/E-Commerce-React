import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import  { Container, Row, Col, Button } from "react-bootstrap";

function NotFound(){
  return (
    <Container className=''>

      <Row>

        <Col className="container-fluid-center">

          <div>

            <h2 className="text-center fs-1">404 - Not Found</h2>

          </div>

        </Col>

      </Row>

      <Row className="container-fluid-center">

      <Col>

        <div className='fs-1'>

          <p className='text-center'>Sorry, the page you are looking for does not exist. You can navigate back to the home page with the link below</p>


          <Nav.Link to="/" as={Link} className="nav-link mb-5" id="error-home-page"><Button variant="">Home Page</Button></Nav.Link>
          
        </div>

      </Col>

        


      </Row>

      <Row>

        <Col className="container-fluid-center">

          <div className="" id="error-img">

            {/* <img src={error} alt="404 error picture" className='img-fluid rounded border border-black shadow-lg'/> */}
            
          </div>

        </Col>

      </Row>

    </Container>
  );

}

export default NotFound;