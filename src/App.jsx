import HomePage from './components/Page-Components/HomePage';


// general imports
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, React} from 'react';
import { Routes,Route,useRoutes } from "react-router-dom";
import SignIn from './components/Page-Components/SignInForm'

const App = () => {


  return (
    <div id="app-container"  data-bs-theme="light" className='text-black'>
  
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/:id/*" element={<HomePage/>}/>
    </Routes>

    <footer>

      <div>

        <p>All rights reserved. &copy; E-Commerce 2024.</p>

      </div>

    </footer>

    </div>
  );

};

export default App


{/* <Route path="/products" element={<ProductList products={products}/>}/>
<Route path="/customers" element={<CustomerList customers={customers}/>}/>
<Route path="/customer-accounts" element={<CustomerAccountsList accounts={accounts}/>}/>
<Route path="/orders" element={<OrdersList orders={orders}/>}/> */}