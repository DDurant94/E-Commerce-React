import { Container } from "react-bootstrap";
import { Routes,Route, useParams } from "react-router-dom";
import CustomerProductList from '../User-Components/Lists/Products/CustomerProductList'
import NotFound from '../ErrorPage';
import HomePage from "../HomePage";
import { array,object } from 'prop-types';


export function UserRoutes({products}){
  const params = useParams();
  return (
    <>
    
    <Routes>
    <Route path="">
      <Route index element={<HomePage />}/>
      <Route path='inventory/:id' element={<CustomerProductList products={products}/>}/>
      {/* <Route path="product-form/:id" element={<ProductForm />}/>
      <Route path="product-details/:id" element={<ProductWrapper/>}/>
      <Route path="customer-form" element={<CustomerForm />}/>
      <Route path="customer-form/:id" element={<CustomerForm/>}/>
      <Route path="customer-details/:id" element={<CustomerWrapper/>}/>
      <Route path="customer-account-form" element={<CustomerAccountForm/>}/>
      <Route path="customer-account-form/:id" element={<CustomerAccountForm/>}/>
      <Route path="customer-account-details/:id" element={<CustomerAccountWrapper/>}/>
      <Route path="order-details/:id" element={<OrderWrapper/>}/>
      <Route path="customer-cart/:id" element={<Cart/>}/> */}
      
      <Route path="*" element={<NotFound />}/>
  </Route>
  </Routes>
  </>
  )
};

UserRoutes.propTypes={
  params:object,
  products:array
}

export default UserRoutes;