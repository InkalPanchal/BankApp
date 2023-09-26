import api from "../Axios/api";
import { setCookie } from "./cookieFunction";
const apiUrl = process.env.REACT_APP_API_USER_URL;
class AuthService {
  CreateAccount(user) {
    return api.post(`${apiUrl}/add`, user);
  }
  async Login(user) {
    const res = await api.post(`${apiUrl}/login`, user);
    if (res.data.data.Name) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          UserId: res.data.data._id,
          Name: res.data.data.Name,
          Email: res.data.data.Email,
        })
      );
      setCookie("token", res.data.token, 7);
    }
    return res;
  }
}

const Auth = new AuthService();
export default Auth;
