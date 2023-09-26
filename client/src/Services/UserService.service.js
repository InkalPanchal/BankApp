import api from "../Axios/api";
const apiUrl = process.env.REACT_APP_API_USER_URL;

class UserService {
  GetUsers() {
    return api.get(apiUrl);
  }
  Deposit(user) {
    return api.post(
      `${apiUrl}/deposit/token-required`,
      user
      // {
      //   withCredentials: true,
      // }
    );
  }
  Transfer(user) {
    return api.post(`${apiUrl}/transfer/token-required`, user);
  }
  GetUserById(id) {
    return api.get(`${apiUrl}/user/${id}`);
  }
}
const User = new UserService();
export default User;
