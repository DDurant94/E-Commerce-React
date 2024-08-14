import NotFound from '../ErrorPage';
import HomePage from "../HomePage";
import { Container } from "react-bootstrap";
import { Routes,Route, useParams } from "react-router-dom";
import { array,object } from 'prop-types';
// Admin page imports
// products
import ProductList from '../Admin-Components/Lists/Products/ProductsList';
import ProductForm from '../Admin-Components/Forms/Products/ProductForm';
import ProductWrapper from '../Admin-Components/Wrappers/Product/ProductWrapper';
// orders
import OrdersList from '../Admin-Components/Lists/Orders/OrdersList';
// import OrdersForm from '../Admin-Components/Forms/Orders/OrdersForm';
import OrderWrapper from '../Admin-Components/Wrappers/Order/OrderWrapper';
// customer accounts
import CustomerAccountsList from '../Admin-Components/Lists/Accounts/CustomerAccountsList';
import CustomerAccountForm from '../Admin-Components/Forms/Accounts/CustomerAccountForm';
import CustomerAccountWrapper from '../Admin-Components/Wrappers/Account/AccountWrapper';
// customers
import CustomerList from '../Admin-Components/Lists/Customers/CustomersList';
import CustomerForm from '../Admin-Components/Forms/Customers/CustomerForm';
import CustomerWrapper from '../Admin-Components/Wrappers/Customer/CustomerWrapper';


export function AdminRoutes({products, orders, customers,}){
  const params = useParams();
  return (
    <>
      
      <Routes>
        <Route path="/admin">
          <Route path="home" element={<HomePage />}/>
          <Route path="products" element={<ProductList products={products}/>}/>
          <Route path="product-form" element={<ProductForm />}/>
          <Route path="product-form/:id" element={<ProductForm />}/>
          <Route path="product-details/:id" element={<ProductWrapper/>}/>
          <Route path="customers" element={<CustomerList customers={customers}/>}/>
          <Route path="customer-form" element={<CustomerForm />}/>
          <Route path="customer-form/:id" element={<CustomerForm/>}/>
          <Route path="customer-details/:id" element={<CustomerWrapper/>}/>
          <Route path="customer-accounts" element={<CustomerAccountsList accounts={accounts}/>}/>
          <Route path="customer-account-form" element={<CustomerAccountForm/>}/>
          <Route path="customer-account-form/:id" element={<CustomerAccountForm/>}/>
          <Route path="customer-account-details/:id" element={<CustomerAccountWrapper/>}/>
          <Route path="orders" element={<OrdersList orders={orders}/>}/>
          <Route path="order-details/:id" element={<OrderWrapper/>}/>
          <Route path="customer-cart/:id" element={<Cart/>}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
    </Routes>
  </>
  )
};

AdminRoutes.propTypes = {
  params:object,
  products: array,
  customers:array,
  orders:array
}

export default AdminRoutes;