import React, { useEffect, useState } from "react";
import UserService from "../Services/UserService.service";
import { getCookie } from "../Services/cookieFunction";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../Actions/actions";
import { connect } from "react-redux";
const Transfer = ({ logout }) => {
  const [amnt, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const token = getCookie("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { UserId } = JSON.parse(localStorage.getItem("user"));

      let amount = parseInt(amnt);

      const result = await UserService.Transfer({
        receiverId: receiver,
        senderId: UserId,
        amount: amount,
      });
      if (result) {
        if (result.status === 200) {
          setMessage(result.data.data);
        }
      }
      setTimeout(() => {
        setMessage("");
        setAmount(0);
        setReceiver("");
      }, 3000);
    } catch (ex) {
      if (ex.response) {
        setErrMsg(ex.response.data.error);
        if (ex.response.data.error === "jwt expired") {
          logout();
          navigate("/login");
        }
      } else {
        setErrMsg(ex.message);
      }
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="container">
        {errMsg ? (
          <div className="alert alert-danger text-center p-2">{errMsg}</div>
        ) : (
          message && <div className="alert alert-success">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <h3>Transfer Funds</h3>
            <label htmlFor="receiver">Receiver</label>
            <input
              type="text"
              name="receiver"
              value={receiver}
              className="form-control"
              id="receiver"
              placeholder="Enter receiver's UserID"
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              value={amnt}
              className="form-control"
              id="amount"
              placeholder="Enter your amount to deposit"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Transfer
          </button>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch({ type: LOGIN }),
    logout: () => dispatch({ type: LOGOUT }),
  };
};
const mapStateToProps = (state) => {
  // console.log(state);
  return { isLoggedIn: state.reducer.isLoggedIn };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
