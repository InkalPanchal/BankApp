import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT } from "../Actions/actions";

import Auth from "../Services/auth.service";
import {
  clearMessage,
  loginUser,
  setErrMessage,
  setMessage,
} from "../Reducer/reducers";

import { useFormik } from "formik";
import { loginSchema } from "../Schema/ValidationSchema";

const Login = ({ signin, errMsg, setErrMsg, msg, setMsg, clearMsg }) => {
  console.log("return Login");
  const navigate = useNavigate();
  const [confirmBox, setConfirmBox] = useState(false);
  const [errBox, setErrBox] = useState(false);

  const handleSubmit = async ({ Email, Password }) => {
    try {
      const user = await Auth.Login({ Email, Password });
      if (user) {
        if (user.status === 200) {
          signin();
          setMsg(user.data.msg);
        }
        setConfirmBox(true);
      }
      setTimeout(() => {
        clearMsg();
        setConfirmBox(false);
        navigate("/home");
        formik.resetForm();
        window.location.reload();
      }, 2000);
    } catch (ex) {
      if (ex.response) {
        if (ex.response.data.error.includes("user validation failed:")) {
          let errors = ex.response.data.error
            .split("user validation failed:")[1]
            .split(":");
          setErrMsg(errors[1]);
          setErrBox(true);
        } else {
          setErrBox(true);
          setErrMsg(ex.response.data.error);
        }
      } else {
        setErrBox(true);
        setErrMsg(ex.message);
      }
      setTimeout(() => {
        setErrMsg("");
        setErrBox(false);
        navigate("/login");
        formik.resetForm();
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container p-2">
        {errBox && (
          <div className="alert alert-danger text-center fw-bold p-2">
            {errMsg}
          </div>
        )}
        {confirmBox && msg ? (
          <div className="alert alert-success text-center fw-bold">{msg}</div>
        ) : (
          <div style={{ margin: "183px 180px" }}>
            <div className="card">
              <div className="card-header fw-bold fs-3">Login</div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group my-3">
                    {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                    <input
                      type="email"
                      name="Email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email Address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      defaultValue={formik.values.Email}
                    />
                    {formik.touched.Email &&
                      formik.errors &&
                      formik.errors.Email && (
                        <div className="alert alert-danger">
                          {formik.errors.Email}
                        </div>
                      )}
                  </div>
                  <div className="form-group my-3">
                    {/* <label htmlFor="exampleInputPassword1">Password</label> */}
                    <input
                      type="password"
                      name="Password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      defaultValue={formik.values.Password}
                    />
                    {formik.touched.Password &&
                      formik.errors &&
                      formik.errors.Password && (
                        <div className="alert alert-danger">
                          {formik.errors.Password}
                        </div>
                      )}
                  </div>
                  <div className="my-2 float-end">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/forgotPassword">
                      Forgot Password
                    </Link>
                  </div>
                  <div></div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formik.isValid}>
                    Login
                  </button>
                  <div className="mt-2">
                    New User?
                    <Link style={{ textDecoration: "none" }} to="/register">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signin: () => dispatch(loginUser()),
    logout: () => dispatch({ type: LOGOUT }),
    setMsg: (message) => dispatch(setMessage(message)),
    setErrMsg: (message) => dispatch(setErrMessage(message)),
    clearMsg: () => dispatch(clearMessage()),
  };
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducer.isLoggedIn,
    msg: state.reducer.msg,
    errMsg: state.reducer.errMsg,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
