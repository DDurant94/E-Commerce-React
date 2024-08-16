import { useParams, useNavigate } from "react-router-dom";
import CartDetails from "../../Details/Cart/CartDetails";

function CartWrapper(){
  let params = useParams();
  let navigate = useNavigate();

  return <CartDetails params={params} navigate={navigate} />
}

export default CartWrapper;