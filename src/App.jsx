import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavigationBar from './components/Page-Components/Admin/Navigation/NavigationBar';
import SignIn from './components/Page-Components/Admin/Forms/SignIn/SignInForm';
import Cart from './components/Page-Components/Admin/Details/Cart/Cart';
import HomePage from './../src/components/Page-Components/HomePage';
import ProductList from './components/Page-Components/Admin/Lists/Products/ProductsList';
import CustomerProductList from './components/Page-Components/User-Components/Lists/Products/CustomerProductList';
import ProductForm from './components/Page-Components/Admin/Forms/Products/ProductForm';
import ProductWrapper from './components/Page-Components/Wrappers/Product/ProductWrapper';
import CustomerList from './components/Page-Components/Admin/Lists/Customers/CustomersList';
import CustomerForm from './components/Page-Components/Admin/Forms/Customers/CustomerForm';
import CustomerWrapper from './components/Page-Components/Wrappers/Customer/CustomerWrapper';
import CustomerAccountsList from './components/Page-Components/Admin/Lists/Accounts/CustomerAccountsList';
import CustomerAccountForm from './components/Page-Components/Admin/Forms/Accounts/CustomerAccountForm';
import CustomerAccountWrapper from './components/Page-Components/Wrappers/Account/AccountWrapper';
import OrdersList from './components/Page-Components/Admin/Lists/Orders/OrdersList';
import OrderWrapper from './components/Page-Components/Wrappers/Order/OrderWrapper';
import NotFound from './components/Page-Components/ErrorPage';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    fetchProducts();
    fetchCustomers();
    fetchCustomerAccounts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try{
      const responseProducts = await axios.get('http://127.0.0.1:5000/products');
      setProducts(responseProducts.data);
    } catch(error){
      console.error('Error fetching products:', error)
    }
  };

  const fetchCustomers = async () => {
    try{
      const responseCustomers = await axios.get('http://127.0.0.1:5000/customers');
      setCustomers(responseCustomers.data);
    } catch(error){
      console.error('Error fetching customers:', error)
    }

  };

  const fetchOrders = async () => {
    try{
      const responseOrders = await axios.get('http://127.0.0.1:5000/orders');
      setOrders(responseOrders.data);
    }catch (error){
      console.log("Error fetching orders:", error)
    }
  };

  const fetchCustomerAccounts = async () => {
    try{
      const responseCustomersAccount = await axios.get('http://127.0.0.1:5000/customer_accounts');
      setAccounts(responseCustomersAccount.data);
    }catch (error){
      console.log("Error fetching orders:", error)
    }
  };

  return (
    <div id="app-container"  data-bs-theme="light" className='text-black'>
    <NavigationBar />
    <Routes>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/" element={<HomePage />}/>
      <Route path="/inventory/:id" element={<CustomerProductList products={products}/>}/>
      <Route path="/products" element={<ProductList products={products}/>}/>
      <Route path="/product-form" element={<ProductForm />}/>
      <Route path="/product-form/:id" element={<ProductForm />}/>
      <Route path="/product-details/:id" element={<ProductWrapper/>}/>
      <Route path="/customers" element={<CustomerList customers={customers}/>}/>
      <Route path="/customer-form" element={<CustomerForm />}/>
      <Route path="/customer-form/:id" element={<CustomerForm/>}/>
      <Route path="/customer-details/:id" element={<CustomerWrapper/>}/>
      <Route path="/customer-accounts" element={<CustomerAccountsList accounts={accounts}/>}/>
      <Route path="/customer-account-form" element={<CustomerAccountForm/>}/>
      <Route path="/customer-account-form/:id" element={<CustomerAccountForm/>}/>
      <Route path="/customer-account-details/:id" element={<CustomerAccountWrapper/>}/>
      <Route path="/orders" element={<OrdersList orders={orders}/>}/>
      <Route path="/order-details/:id" element={<OrderWrapper/>}/>
      <Route path="/customer-cart/:id" element={<Cart/>}/>
      <Route path="*" element={<NotFound />}/>
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


{/* <Route path="/admin">
<Route path=":/products" element={<ProductList products={products}/>}/>
<Route path=":/product-form" element={<ProductForm />}/>
<Route path=":/product-form/:id" element={<ProductForm />}/>
<Route path=":/product-details/:id" element={<ProductWrapper/>}/>
<Route path=":/customers" element={<CustomerList customers={customers}/>}/>
<Route path=":/customer-form" element={<CustomerForm />}/>
<Route path=":/customer-form/:id" element={<CustomerForm/>}/>
<Route path=":/customer-details/:id" element={<CustomerWrapper/>}/>
<Route path=":/customer-accounts" element={<CustomerAccountsList accounts={accounts}/>}/>
<Route path=":/customer-account-form" element={<CustomerAccountForm/>}/>
<Route path=":/customer-account-form/:id" element={<CustomerAccountForm/>}/>
<Route path=":/customer-account-details/:id" element={<CustomerAccountWrapper/>}/>
<Route path=":/orders" element={<OrdersList orders={orders}/>}/>
<Route path=":/order-details/:id" element={<OrderWrapper/>}/>
<Route path=":/customer-cart/:id" element={<Cart/>}/>
</Route> */}