import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { LOGIN, LOGOUT } from "../Actions/actions";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarDiv from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../Services/cookieFunction";

const Navbar = ({ logout, isLoggedIn, login }) => {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState(false);
  // const [UserrId, setUserrId] = useState("");
  const [user, setUser] = useState({
    UserId: "",
    Name: "",
    Email: "",
  });
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      // setIsLogin(isLoggedIn);
      console.log("notloggedin", isLoggedIn);
      console.log("----------------------------");
      logout();
      setUser(() => ({
        ...user,
        UserId: "",
        Name: "Login",
        Email: "",
      }));
      navigate("/login");
    } else {
      login();
      var { UserId, Name } = JSON.parse(localStorage.getItem("user"));
      // setUserrId(UserId);
      setUser(() => ({ ...user, USerId: UserId, Name: Name }));
      // setIsLogin(isLoggedIn);
      console.log("loggedin", isLoggedIn);
      console.log("----------------------------");
    }
    console.log("isLoggedIn changed");
  }, [setUser, isLoggedIn]);

  return (
    <NavbarDiv variant="dark" bg="dark" expand="lg">
      <Container>
        <NavbarDiv.Brand href="#home">MyBank</NavbarDiv.Brand>
        <NavbarDiv.Toggle aria-controls="navbar-dark-example" />
        <NavbarDiv.Collapse id="navbar-dark-example">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">About Us</Nav.Link>
            <Nav.Link href="contact">Contact Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user.Name}
              menuVariant="dark">
              {isLoggedIn ? (
                <>
                  {/* <NavDropdown.Item href="/accounts">Accounts</NavDropdown.Item> */}
                  <NavDropdown.Item href="/deposit">Deposit</NavDropdown.Item>
                  <NavDropdown.Item href="transfer">
                    Transfer Funds
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/transactionList">
                    Transaction History
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      logout();
                      navigate("/login");
                      //document.location.reload();
                    }}>
                    LogOut
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/login");
                  }}>
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </NavbarDiv.Collapse>
      </Container>
    </NavbarDiv>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
