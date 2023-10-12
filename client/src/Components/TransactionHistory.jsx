import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import TransactionService from "../Services/TransactionService.service";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../Services/cookieFunction";
import { connect } from "react-redux";
import { LOGIN, LOGOUT } from "../Actions/actions";

const TransactionHistory = ({ logout }) => {
  console.log("return TransactionHistory");

  const [transactionss, setTransactionss] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [array, setArray] = useState([]);
  const navigate = useNavigate();
  const token = getCookie("token");

  const paginationData = (arr) => {
    // console.log("14:>", arr);
    // const data = arr.slice(0);
    const pages = Math.ceil(arr.length / 10);
    // console.log(pages);
    var arrr = [];
    const size = 10;
    for (let i = 0; i < pages; i++) {
      // console.log("25:>", data);
      arrr.push(arr.splice(0, size));
      console.log("arrr", arrr);
      setArray(arrr);
      // console.log(arrr);
    }
    console.log(arrr);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate("/login");
        } else {
          const { UserId } = JSON.parse(localStorage.getItem("user"));
          const trans = await TransactionService.GetUserTransactions(UserId);
          if (trans) {
            if (trans.status === 200) {
              if (trans.data.data.length > 0) {
                var transData = trans.data.data.slice(0);
                console.log("transData.splice(0, 10)", transData.splice(0, 10));
                setTransactionss(transData.splice(0, 10));
                setDataLength(trans.data.data.length);
                setCurrentPage(1);
                // console.log(trans.data.data.length);
                // console.log(trans.data.data);
                paginationData(trans.data.data);
              }
            }
          }
        }
      } catch (ex) {
        console.log(ex);
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
    }
    fetchData();
  }, []);

  const handlePageChange = (e) => {
    setCurrentPage(e);
    console.log(array[e - 1]);
    setTransactionss(array[e - 1]);
  };
  return (
    <>
      <div className="container">
        <div className="container-fluid mx-0 px-0">
          <h2>Transacrions History</h2>
        </div>
        {errMsg ? errMsg : null}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>TransactionId</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionss.length > 0 &&
              transactionss.map((tran, index) => {
                return (
                  <tr key={index}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{tran._id}</td>
                    <td>{tran.Amount}</td>
                    <td>{tran.TransactionType}</td>
                    <td>
                      {new Date(tran.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                      }) +
                        ", " +
                        format(new Date(tran.createdAt), "dd/MM/yyyy")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "8px" }}>
          <Pagination
            activePage={currentPage}
            itemClass="page-item"
            linkClass="page-link"
            itemsCountPerPage={10}
            totalItemsCount={dataLength}
            pageRangeDisplayed={10}
            onChange={(e) => handlePageChange(e)}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
