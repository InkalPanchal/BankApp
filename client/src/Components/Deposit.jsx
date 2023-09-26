import React, { useState, useEffect } from "react";
import UserService from "../Services/UserService.service";
import { getCookie } from "../Services/cookieFunction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN, LOGOUT } from "../Actions/actions";
const Deposit = ({ logout }) => {
  const [amnt, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      if (!token) {
        navigate("/login");
      } else {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUserId(userData.UserId);
        const user = await UserService.GetUserById(userData.UserId);
        if (user) {
          setUserBalance(user.data.data[0].Balance);
        }
      }
    };
    fetchData();
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // const userId = userData.data._id;
      let amount = parseInt(amnt);
      const result = await UserService.Deposit({ userId, amount });
      // console.log(document.cookie);
      if (result) {
        if (result.status === 200) {
          setMessage(result.data.msg);
        }
      }

      setTimeout(() => {
        setMessage("");
        setAmount(0);
      }, 3000);
    } catch (ex) {
      console.log(ex);
      console.log(ex.message);
      if (ex.response) {
        setErrMsg(ex.response.data.error);
        if (ex.response.data.error === "jwt expired") {
          logout();
          navigate("/login");
        }
      } else setErrMsg(ex.message);
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
            <h3>Balance: {userBalance}</h3>
            <h3>Deposit Funds</h3>

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
            Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
