import { useParams, useNavigate } from "react-router-dom";
import AccountDetails from '../../Details/Account/AccountDetails'

function CustomerAccountWrapper(){
  let params = useParams();
  let navigate = useNavigate();

  return <AccountDetails params={params} navigate={navigate} />
}

export default CustomerAccountWrapper;