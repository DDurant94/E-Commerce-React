// component imports
import HomePage from './components/Page-Components/HomePage'
import NavigationBar from './components/Page-Components/Admin-Components/Navigation/NavigationBar';
import ProductList from './components/Page-Components/Admin-Components/Lists/Products/ProductsList';
import ProductForm from './components/Page-Components/Admin-Components/Forms/Products/ProductForm';
import ProductWrapper from './components/Page-Components/Admin-Components/Wrappers/Product/ProductWrapper';
import CustomerList from "./components/Page-Components/Admin-Components/Lists/Customers/CustomersList";
import CustomerForm from './components/Page-Components/Admin-Components/Forms/Customers/CustomerForm';
import CustomerWrapper from './components/Page-Components/Admin-Components/Wrappers/Customer/CustomerWrapper';
import CustomerAccountsList from './components/Page-Components/Admin-Components/Lists/Accounts/CustomerAccountsList';
import CustomerAccountForm from './components/Page-Components/Admin-Components/Forms/Accounts/CustomerAccountForm';
import CustomerAccountWrapper from './components/Page-Components/Admin-Components/Wrappers/Account/AccountWrapper';
import OrdersList from './components/Page-Components/Admin-Components/Lists/Orders/OrdersList';
import OrderWrapper from './components/Page-Components/Admin-Components/Wrappers/Order/OrderWrapper';
import OrderForm from './components/Page-Components/Admin-Components/Forms/Orders/OrdersForm';
import CartsList from './components/Page-Components/Admin-Components/Lists/Carts/CartsList';
import CartWrapper from './components/Page-Components/Admin-Components/Wrappers/cart/CartWrapper';
import SignIn from './components/Page-Components/SignInForm';
import NotFound from './components/Page-Components/ErrorPage';
import './components/Styles-component/Styles.css'

// general imports
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, React} from 'react';
import { Routes,Route, } from "react-router-dom";
import { object } from 'prop-types';

const App = () => {

  return (
    <>
      <div id="app-container"  data-bs-theme="dark" className='text-black'>
    <NavigationBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/product-form" element={<ProductForm />}/>
      <Route path="/product-form/:id" element={<ProductForm />}/>
      <Route path="/product-details/:id" element={<ProductWrapper/>}/>
      <Route path="/customers" element={<CustomerList/>}/>
      <Route path="/customer-form" element={<CustomerForm />}/>
      <Route path="/customer-form/:id" element={<CustomerForm/>}/>
      <Route path="/customer-details/:id" element={<CustomerWrapper/>}/>
      <Route path="/customer-accounts" element={<CustomerAccountsList/>}/>
      <Route path="/customer-account-form" element={<CustomerAccountForm/>}/>
      <Route path="/customer-account-form/:id" element={<CustomerAccountForm/>}/>
      <Route path="/customer-account-details/:id" element={<CustomerAccountWrapper/>}/>
      <Route path="/orders" element={<OrdersList/>}/>
      <Route path="/order-details/:id" element={<OrderWrapper/>}/>
      <Route path="/order-form" element={<OrderForm/>}/>
      <Route path="/order-form/:id" element={<OrderForm/>}/>
      <Route path="/carts" element={<CartsList/>}/>
      <Route path="/cart-details/:id" element={<CartWrapper/>}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>

    <footer className='p-3 bg-black text-light'>

      <div className='text-center m-2'>

        <p>All rights reserved. &copy; E-Commerce 2024.</p>

      </div>

    </footer>

    </div>
    </>
  );

};

App.propTypes = {
  params:object
}

export default App


{/* <Route path="/products" element={<ProductList products={products}/>}/>
<Route path="/customers" element={<CustomerList customers={customers}/>}/>
<Route path="/customer-accounts" element={<CustomerAccountsList accounts={accounts}/>}/>
<Route path="/orders" element={<OrdersList orders={orders}/>}/> */}