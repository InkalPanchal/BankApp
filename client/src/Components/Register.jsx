import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Services/auth.service";
import { connect } from "react-redux";
import { clearMessage, setErrMessage, setMessage } from "../Reducer/reducers";
import { useFormik } from "formik";
import { registerSchema } from "../Schema/ValidationSchema";

const Register = ({ setMsg, setErrMsg, clearMsg, errMsg, msg }) => {
  console.log("return Register");

  const navigate = useNavigate();
  const userData = {
    Name: "",
    Password: "",
    Email: "",
    MobileNo: 0,
    DOB: "",
  };
  const [confirmBox, setConfirmBox] = useState(false);
  const [errBox, setErrBox] = useState(false);
  const handleSubmit = async (e) => {
    try {
      console.log(e);
      const user = await AuthService.CreateAccount(e);
      if (user) {
        if (user.status === 200) {
          setMsg(user.data.data.msg);
        }
        setConfirmBox(true);
        setTimeout(() => {
          clearMsg();
          setConfirmBox(false);
          navigate("/login");
          formik.resetForm();
        }, 2000);
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response.data.error.includes("user validation failed:")) {
        console.log(ex.response.data.error.split("user validation failed:"));
        let errors = ex.response.data.error
          .split("user validation failed:")[1]
          .split(":");
        console.log(errors[1]);
        setErrMsg(errors[1]);
        setErrBox(true);
      } else {
        setErrMsg(ex.response.data.error);
        setErrBox(true);
        console.log(ex.response.data.error);
        if (ex.response.data.error === "Email is already registered.") {
          setTimeout(() => {
            setErrMsg("");
            setErrBox(false);
            navigate("/login");
            formik.resetForm();
          }, 2000);
        } else {
          setTimeout(() => {
            setErrMsg("");
            setErrBox(false);
            formik.resetForm();
          }, 2000);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: userData,
    validationSchema: registerSchema,
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
        {confirmBox && msg && (
          <div className="alert alert-success text-center fw-bold">{msg}</div>
        )}
        {/* <form onSubmit={formik.handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="exampleInputName" className="form-label ">
              Name
            </label>

            <input
              type="text"
              name="Name"
              className={`form-control`}
              id="exampleInputName"
              placeholder="Enter your name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.Name}
            />
            {formik.touched.Name && formik.errors && formik.errors.Name && (
              <div className="alert alert-danger">{formik.errors.Name}</div>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="Email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.Email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {formik.touched.Email && formik.errors && formik.errors.Email && (
              <div className="alert alert-danger">{formik.errors.Email}</div>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          <div className="form-group my-3">
            <label htmlFor="exampleInputMobileNo">Mobile Number</label>
            <input
              type="text"
              name="MobileNo"
              className="form-control"
              id="exampleInputMobileNo"
              placeholder="Enter your Mobile Number"
              maxLength={10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.MobileNo}
            />
            {formik.touched.MobileNo &&
              formik.errors &&
              formik.errors.MobileNo && (
                <div className="alert alert-danger">
                  {formik.errors.MobileNo}
                </div>
              )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputDOB">DOB</label>
            <input
              type="date"
              className="form-control"
              name="DOB"
              id="exampleInputDOB"
              placeholder="Enter your Date of birth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.DOB}
            />
            {formik.touched.DOB && formik.errors && formik.errors.DOB && (
              <div className="alert alert-danger">{formik.errors.DOB}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid}>
            Register
          </button>
          <div>
            Already registered?
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </div>
        </form> */}
        cognitive
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMsg: (message) => dispatch(setMessage(message)),
    setErrMsg: (message) => dispatch(setErrMessage(message)),
    clearMsg: () => dispatch(clearMessage()),
  };
};
const mapStateToProps = (state) => {
  return { msg: state.reducer.msg, errMsg: state.reducer.errMsg };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
