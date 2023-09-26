// import axios from "axios";
import api from "../Axios/api";
const apiUrl = process.env.REACT_APP_API_TRANSACTION_URL;

class TransactionService {
  GetUserTransactions(id) {
    return api.get(`${apiUrl}/${id}/token-required`);
  }
}
const User = new TransactionService();
export default User;
