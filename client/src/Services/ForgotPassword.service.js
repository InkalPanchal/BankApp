import api from "../Axios/api";
const apiUrl = process.env.REACT_APP_API_FORGOT_PASSWORD_URL;

class ForgotPasswordService {
  SendResetLink(Email) {
    return api.post(`${apiUrl}/fotgot-passwrod`, Email);
  }
  ResetPassword(Password, token) {
    return api.post(`${apiUrl}/reset-password/${token}`, Password);
  }
}

const ForgotPasswrod = new ForgotPasswordService();
export default ForgotPasswrod;
