import { Button,Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {

  return (
    <>
      <header className="p-4 mx-3">
        <div>
          <h1>E-Commerce</h1>
          <p>Welcome to E-Commerce where you can shop till you drop!</p>
            <Nav.Link to="/sign-in" as={Link} className="nav-link mb-5" id="error-home-page"><Button variant="primary">Sign-In</Button></Nav.Link>
             
        </div>
      </header>
      <body className="rounded mx-3">

        <section className="p-3">
        <div className="card">
            <div className="card-body">
              <h2 className="card-title">About E-Commerce</h2>
              <p className="card-text">
                E-Commerce is a new shopping platform built with React Vite. It offers a smooth and dynamic user interface (UI). Created as a className project 
                while Daniel was attending Coding Temple, both the front end and back end were built from the ground up. This project was Daniel's first 
                full-stack webpage. He plans to build on these new skills to improve the UI and API management, ensuring you have the best experience possible. <br />
                E-Commerce features a catalog, customer creation, account creation, order management, and cart management. These 
                functionalities are available from a customer perspective and include admin capabilities for editing and manual input across 
                different pages. The catalog also integrates a low stock warning, so customers know when to order a product before it runs out.
                </p>
            </div>
          </div>

        </section>

        <section className="bg-black rounded border border-primary my-5">
          <Row className="p-3">

            <h2 className="text-center bg-primary p-2 my-3 rounded text-black">Featured Pages</h2>

            <Col className="p-4">

              <div className="card">
                <div className="card-header">
                    Featured
                </div>
                  <div className="card-body">
                    <h5 className="card-title">Product Catalog</h5>
                    <p className="card-text">
                      Discover everything you need and more! If we don't have what you're looking for, contact us, and we'll find it for you. 
                      Here at E-Commerce, we are constantly adding new products to our catalog. We aim to be your personal shop for all your needs.
                    </p>
                    <Nav.Link to="/products" as={Link} className="nav-link mb-5" id="error-home-page"><Button variant="primary">Catalog</Button></Nav.Link>
                  </div>
              </div>
            
            </Col>

            <Col className="p-4">

              <div className="card">
                  <div className="card-header">
                    Featured
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Create Account</h5>
                    <p className="card-text">
                      Come and create an account with us! You don't need an account to shop, but you can enjoy a more personalized experience if you do. 
                      We also offer a loyalty program that gives cash back to our account holders. You must have a customer ID.
                    </p>
                    <Nav.Link to="/customer-account-form" as={Link} className="nav-link mb-5" id="error-home-page"><Button variant="primary">Create Account</Button></Nav.Link>
                  </div>
              </div>
            
            
            </Col>

          </Row>
        </section>

        <footer className="mx-4 p-3 mb-3">
            <div className="p-3">
            <h3>Let's Connect!</h3>

              <p>
                I'm open to new opportunities, collaborations, and interesting projects. Feel free to explore my work, check out my <a href="https://github.com/DDurant94" className="github">GitHub</a>, 
                and drop me an <a className="email" href="mailto:dannyjdurant@gmail.com">Email</a>. Let's cultivate innovation together!
              </p>

            </div>  
          </footer> 

      </body>

    </>
  );

};


export default HomePage;