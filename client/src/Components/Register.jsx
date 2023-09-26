import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Name: "",
    Password: "",
    Email: "",
    MobileNo: 0,
    DOB: "",
  });
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!userData.Name) {
      newErrors.Name = "Name is required";
    } else if (userData.Name.length < 3) {
      newErrors.Name = "Name should be atleast 3 characters long.";
    }

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

    if (!userData.MobileNo) {
      newErrors.MobileNo = "Mobile Number is required";
    } else if (userData.MobileNo.length !== 10) {
      newErrors.MobileNo = "Mobile number must be 10 digits long";
    }

    if (!userData.DOB) {
      newErrors.DOB = "Date of birth is required";
    }
    setErrors(newErrors);
    console.log("newErrors", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        const user = await AuthService.CreateAccount(userData);
        // console.log(user);
        if (user) {
          if (user.status === 200) {
            setMessage(user.data.data.msg);
            navigate("/login");
          }
        }
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
      } else {
        setErrMsg(ex.response.data.error);
      }
    }
  };
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
        } else if (name === "MobileNo") {
          if (value.length < 10) {
            setErrors((prev) => ({
              ...prev,
              [name]: `${name} must be 10 digits!`,
            }));
          } else {
            setErrors((prev) => ({ ...prev, [name]: `` }));
          }
        } else if (name === "Name") {
          if (value.length < 3) {
            setErrors((prev) => ({
              ...prev,
              [name]: `${name} atleast 3 characters long!`,
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
        {errMsg ? (
          <div className="alert alert-danger p-2">{errMsg}</div>
        ) : (
          message && <div className="alert alert-success-2">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
            />
            {errors.Name && <p className="alert alert-danger">{errors.Name}</p>}
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
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.Password && (
              <p className="alert alert-danger">{errors.Password}</p>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputMobileNo">Mobile Number</label>
            <input
              type="number"
              name="MobileNo"
              className="form-control"
              id="exampleInputMobileNo"
              placeholder="Enter your Mobile Number"
              onChange={handleChange}
            />
            {errors.MobileNo && (
              <p className="alert alert-danger">{errors.MobileNo}</p>
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
              onChange={handleChange}
            />
            {errors.DOB && <p className="alert alert-danger">{errors.DOB}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <div>
            Already registered?
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
