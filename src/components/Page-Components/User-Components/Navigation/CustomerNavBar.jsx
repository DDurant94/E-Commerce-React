import {Link, NavLink, useParams, useSearchParams} from "react-router-dom";
import { array,object } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CustomerNavigationBar(){
  
  const id = useParams();
  return (
    <Navbar expand="sm" bg="" className="text-black">

      <Container className="m-0">
        
        <Nav className="mr-auto">

          {/* Icon go here for navigation */}
          

        </Nav>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            
            <Nav.Link to={`/${id.id}`} className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Home</Nav.Link>

            <Nav.Link to={`inventory/${id.id}`} className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Catalog</Nav.Link>

            <Nav.Link to={`customer-account-details/${id.id}`} className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Account</Nav.Link>

            <Nav.Link to={`customer-details/${id.id}`} className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Customer</Nav.Link>

            <Nav.Link to={`cart/${id.id}`} className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Cart</Nav.Link>
            
            <Nav.Link to='/sign-in' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Sign-in</Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  )

}

CustomerNavigationBar.propTypes = {
  params: object,
}
export default CustomerNavigationBar;