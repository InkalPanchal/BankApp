import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { ERR_MSG, LOGIN, LOGOUT } from "../Actions/actions";

import Auth from "../Services/auth.service";
import { getCookie, setCookie } from "../Services/cookieFunction";

const Login = ({ isLoggedIn, signin, errMsg, errr }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    Password: "",
    Email: "",
  });
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmBox, setConfirmBox] = useState(false);
  const [errBox, setErrBox] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!userData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.Email)) {
      newErrors.Email = "Invalid email address";
    }

    if (!userData.Password) {
      newErrors.Password = "Password is required";
    } else if (userData.Password.length < 8) {
      newErrors.Password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    // console.log("newErrors", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        const user = await Auth.Login(userData);
        if (user) {
          if (user.status === 200) {
            signin();
            setMessage(user.data.msg);
          }
          setConfirmBox(true);
        }
        setTimeout(() => {
          setMessage("");
          setConfirmBox(false);
          navigate("/");
        }, 1500);
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response) {
        if (ex.response.data.error.includes("user validation failed:")) {
          console.log(ex.response.data.error.split("user validation failed:"));
          let errors = ex.response.data.error
            .split("user validation failed:")[1]
            .split(":");
          console.log(errors[1]);
          setErrorMsg(errors[1]);
          // errr(errors[1]);
          setErrBox(true);
          setTimeout(() => {
            setErrorMsg("");
            errr("");
            setErrBox(false);
            navigate("/login");
          }, 2000);
        }
      } else {
        setErrBox(true);
        setErrorMsg(ex.message);
        errr(ex.message);
        setTimeout(() => {
          setErrorMsg("");
          errr("");
          setErrBox(false);
          navigate("/login");
        }, 2000);
      }
      // setTimeout(() => {
      //   setErrorMsg("");
      //   error("");
      // }, 5000);
      console.log("80:>", errMsg);
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     if (e.target[0].name === "Email") {
  //       usersData.Email = e.target[0].value;
  //     }
  //     if (e.target[1].name === "Password") {
  //       usersData.Password = e.target[1].value;
  //     }
  //     // console.log(isLoggedIn);
  //     return signin(usersData);
  //   }
  // };
  const handleChange = async (e) => {
    try {
      const { name, value } = e.target;
      if (value.length > 0) {
        if (name === "Email") {
          if (!/\S+@\S+\.\S+/.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: `${name} is invalid!` }));
          } else {
            setErrors((prev) => ({ ...prev, [name]: `` }));
          }
        } else if (name === "Password") {
          if (value.length < 8) {
            setErrors((prev) => ({
              ...prev,
              [name]: `${name} must be 8 characters long!`,
            }));
          } else {
            setErrors((prev) => ({ ...prev, [name]: `` }));
          }
        } else {
          setErrors((prev) => ({ ...prev, [name]: `` }));
        }
      } else {
        setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      }

      // if (value.length > 0 &&) {
      //   if (value.length <= 8) {
      //     setErrors((prev) => ({
      //       ...prev,
      //       [name]: `${name} must be 10 digit!`,
      //     }));
      //   }
      // } else {
      //   setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      // }
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
      <div className="container p-2">
        {errBox && (
          <div className="alert alert-danger text-center p-2">{errorMsg}</div>
        )}
        {confirmBox && message ? (
          <div className="alert alert-success text-center">{message}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                // type="email"
                name="Email"
                className="form-control"
                id="exampleInputEmail1"
                value={userData.Email}
                aria-describedby="emailHelp"
                placeholder="Enter your email address"
                onChange={handleChange}
              />
              {errors.Email && (
                <p className="alert alert-danger">{errors.Email}</p>
              )}
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="Password"
                className="form-control"
                defaultValue={userData.Password}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleChange}
                autoComplete=""
              />
              {errors.Password && (
                <p className="alert alert-danger">{errors.Password}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div>
              New User?
              <Link style={{ textDecoration: "none" }} to="/register">
                Register
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signin: () => dispatch({ type: LOGIN }),
    logout: () => dispatch({ type: LOGOUT }),
    errr: (err) => dispatch({ type: ERR_MSG, msg: err }),
  };
};
const mapStateToProps = (state) => {
  // console.log(state.reducer);
  return { isLoggedIn: state.reducer.isLoggedIn, errMsg: state.reducer.errMsg };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
