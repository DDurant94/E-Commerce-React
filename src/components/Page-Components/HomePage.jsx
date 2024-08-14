import  { Container,Button,Card,Row,Col } from "react-bootstrap";
import { useState, useEffect, React} from 'react';
import { Routes,Route,useRoutes, useParams } from "react-router-dom";
import { object } from 'prop-types';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import AdminRoutes from "./Admin-Components/AdminRoutes";
import UserRoutes from "./User-Components/UserRoutes";
import CustomerNavigationBar from '../Page-Components/User-Components/Navigation/CustomerNavBar'
import NavigationBar from '../Page-Components/Admin-Components/Navigation/NavigationBar'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const {id} = useParams();
  const validation = userValidation();

  console.log(id)
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

  function userValidation(){
    if(id==22){
      return (
        <>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<AdminRoutes products={products} customers={customers} orders={orders} accounts={accounts}/>}/>  
        </Routes>
      </>
      );
    } else{
      return (
        <>
        <CustomerNavigationBar/>
        <Routes>
          <Route path="/" element={<UserRoutes products={products}/>}/> 
        </Routes>
      </>
      );
    }
  };

  return (
    <>

      <h1>Welcome</h1>
      

    </>
  );

};

HomePage.propTypes = {
  id:object
}

export default HomePage;