import React, { useEffect } from "react";
import { LOGIN, LOGOUT } from "../Actions/actions";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarDiv from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../Services/cookieFunction";

const Navbar = ({ logout, isLoggedIn, login, user }) => {
  console.log("user", user);
  console.log("return Navbar");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      logout();
      navigate("/login");
    } else {
      // login();
      console.log(isLoggedIn);
    }
    // console.log("isLoggedIn changed");
  }, [isLoggedIn, user]);

  return (
    <NavbarDiv variant="dark" bg="dark" expand="lg">
      <Container>
        <NavbarDiv.Brand href="/home">MyBank</NavbarDiv.Brand>
        <NavbarDiv.Toggle aria-controls="navbar-dark-example" />
        <NavbarDiv.Collapse id="navbar-dark-example">
          <Nav>
            <Nav.Link className="text-light" href="/home">
              Home
            </Nav.Link>
            <Nav.Link className="text-light" href="about">
              About Us
            </Nav.Link>
            <Nav.Link className="text-light" href="contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user?.Name ? user?.Name : "Profile"}
              menuVariant="dark">
              {user?.Name ? (
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
                      user.Name = "";
                      logout();

                      navigate("/login");
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
  return { isLoggedIn: state.reducer.isLoggedIn };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
