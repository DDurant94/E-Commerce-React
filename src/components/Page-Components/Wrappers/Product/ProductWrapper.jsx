import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "../../Details/Product/ProductDetails";


function ProductWrapper(){
  let params = useParams();
  let navigate = useNavigate();

  return <ProductDetails params={params} navigate={navigate}/>
};

export default ProductWrapper;