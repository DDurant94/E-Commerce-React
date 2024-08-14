import {Link, NavLink} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar(){
  return (
    <Navbar expand="sm" bg="" className="text-black">

      <Container className="m-0">
        
        <Nav className="mr-auto">

          {/* Icon go here for navigation */}
          

        </Nav>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            
            <Nav.Link to='/' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Home</Nav.Link>

            <Nav.Link to='inventory/:id' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Catalog</Nav.Link>

            <Nav.Link to='products' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Products</Nav.Link>

            <Nav.Link to='customer-account-details/:id' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Account</Nav.Link>

            <Nav.Link to='cart' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Cart</Nav.Link>
            
            <Nav.Link to='sign-in' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Sign-in</Nav.Link>

            <NavDropdown title="Admin" id="basic-nav-dropdown">

            <Nav.Link to='products' className="nav-link px-2 rounded" id="nav-links" as={NavLink} activeclassname="active">Products</Nav.Link>

            <Nav.Link to='product-form' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Add Product</Nav.Link>

            <NavDropdown.Divider />

            <Nav.Link to='customers' className="nav-link px-2 rounded" id="nav-links" as={NavLink} activeclassname="active">Customers</Nav.Link>

            <Nav.Link to='customer-form' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Add Customer</Nav.Link>
            
            <NavDropdown.Divider />

            <Nav.Link to='customer-accounts' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Accounts</Nav.Link>

            <Nav.Link to='customer-account-form' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Add Account</Nav.Link>

            <NavDropdown.Divider />

            <Nav.Link to='orders' className="nav-link px-2 rounded" id="nav-links" as={Link} activeclassname="active">Orders</Nav.Link>

            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  )

}

export default NavigationBar;