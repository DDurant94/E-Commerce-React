import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import  { Row, Col, Button } from "react-bootstrap";
import error from './../../assets/pictures/error.png'

function NotFound(){
  return (
    <>

      <Col className='bg-black text-white p-5 b-5'>

        <Row className="container-fluid-center p-5">
          <div>
            <h1 className="text-center fs-1">404 - Not Found</h1>
            <div className='fs-4'>
              <p className='text-center'>Sorry, the page you are looking for does not exist. You can navigate back to the home page with the link below</p>
              <Nav.Link to="/" as={Link} className="nav-link mb-5" id="error-home-page"><Button variant="primary">Home Page</Button></Nav.Link> 
            </div>
          </div>
        </Row>
        <Row className="container-fluid-center mx-5 px-5">
          <div className="p-5" id="error-img">
            <img src={error} alt="404 error picture" className='img-fluid rounded border border-black shadow-lg p-5'/>
          </div>
        </Row>
      </Col>

    </>
  );

}

export default NotFound;