import { useParams, useNavigate } from "react-router-dom";
import CustomerDetails from "../../Admin/Details/Customer/CustomerDetails";

function CustomerWrapper(){
  let params = useParams();
  let navigate = useNavigate();

  return <CustomerDetails params={params} navigate={navigate} />
}

export default CustomerWrapper;