import React, { useState } from "react";
import ForgotPasswrod from "../Services/ForgotPassword.service";
import { useNavigate, useParams } from "react-router-dom";
import { clearMessage, setErrMessage, setMessage } from "../Reducer/reducers";
import { connect } from "react-redux";

const ResetPasswordForm = ({ setMsg, setErrMsg, clearMsg, msg, errMsg }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmBox, setConfirmBox] = useState(false);
  const [errBox, setErrBox] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ForgotPasswrod.ResetPassword(
        JSON.stringify({ newPassword }),
        token
      );
      console.log(response); // Display success or error message
      setMsg(response.data.msg);
      setConfirmBox(true);
      setTimeout(() => {
        clearMsg();
        setConfirmBox(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Error:", error.response.data.error.message);
      setErrMsg(error.response.data.error.message);
      setErrBox(true);
      setTimeout(() => {
        setErrMsg("");
        setErrBox(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="container p-2 ">
        {errBox && <div className="alert alert-danger p-2">{errMsg}</div>}
        {confirmBox && <div className="alert alert-success p-2">{msg}</div>}
        {/* <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button type="submit">Reset Password</button>
        </form> */}

        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPass">New Password</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              id="exampleInputPass"
              onChange={(e) => setNewPassword(e.target.value)}
              defaultValue={newPassword}
            />
            {/* {formik.touched.Email && formik.errors && formik.errors.Email && (
                <div className="alert alert-danger">{formik.errors.Email}</div>
              )} */}
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMsg: (message) => dispatch(setMessage(message)),
    setErrMsg: (message) => dispatch(setErrMessage(message)),
    clearMsg: () => dispatch(clearMessage()),
  };
};
const mapStateToProps = (state) => {
  return {
    msg: state.reducer.msg,
    errMsg: state.reducer.errMsg,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
