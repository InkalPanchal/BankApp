import axios from "axios";
import { getCookie } from "../Services/cookieFunction";
const apiUrl = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    //withCredentials: true,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.url.includes("/token-required")) {
      //console.log("config", config);
      config.headers["authentication"] = getCookie("token");
      //console.log(config.headers);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
