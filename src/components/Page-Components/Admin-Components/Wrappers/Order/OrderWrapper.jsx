import { useParams, useNavigate } from "react-router-dom";
import OrderDetails from "../../Admin/Details/Orders/OrderDetails";

function OrderWrapper(){
  let params = useParams();
  let navigate = useNavigate();

  return <OrderDetails params={params} navigate={navigate}/>
};

export default OrderWrapper;