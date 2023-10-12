import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

const Home = ({ isLoggedIn }) => {
  console.log("return home");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
      setUserData(user);
    } else {
      navigate("/login");
      setUserData(null);
    }
  }, [localStorage]);
  return (
    <>
      <Navbar user={userData} />

      <div>
        <Outlet />
      </div>
      <footer className="bg-dark text-white text-center py-3 fixed-bottom">
        <div className="container">Footer</div>
      </footer>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { isLoggedIn: state.isLoggedIn };
};
export default connect(mapStateToProps)(Home);
