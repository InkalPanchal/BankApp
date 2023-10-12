import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
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
      <header class="hero bg-primary text-white text-center py-5">
        <div class="container">
          {/* <img src="bank-image.jpg" alt="Bank_Image" className="img-fluid" /> */}
          <h1 class="display-4">Your Bank, Your Way</h1>
          <p class="lead">Seamless Banking at Your Fingertips</p>
          <a href="/home" className="btn btn-light btn-lg">
            Get Started
          </a>
        </div>
      </header>

      <section id="features" class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              {/* <img
                src="../Assets/account.png"
                alt="Feature 1"
                class="img-fluid bg-black"
              /> */}
              {/* <Icon.Wallet width={30} height={30}></Icon.Wallet> */}
              <h2>Accounts</h2>
              <p>Access your accounts on the go with our mobile banking app.</p>
              <Nav className="d-block">
                <Nav.Link
                  href="/saving-account"
                  className="accountLink d-block text-decoration-none text-dark">
                  Saving Account
                  <div className="ms-3 d-inline">
                    <Icon.ChevronRight></Icon.ChevronRight>
                  </div>
                </Nav.Link>

                <Nav.Link
                  href="/current-account"
                  className="accountLink d-block text-decoration-none text-dark">
                  Current Account
                  <div className="ms-3 d-inline">
                    <Icon.ChevronRight></Icon.ChevronRight>
                  </div>
                </Nav.Link>
              </Nav>
            </div>
            <div class="col-md-4">
              {/* <img src="feature2-icon.png" alt="Feature 2" class="img-fluid" /> */}
              {/* <Icon.Lock width={30} height={30}></Icon.Lock> */}
              <h2>Secure Transactions</h2>
              <p>
                Your transactions are secured with state-of-the-art encryption.
              </p>
              <Nav className="d-block">
                <Nav.Link
                  href="/deposit"
                  className="accountLink d-block text-decoration-none text-dark">
                  Self Transfer
                  <div className="ms-3 d-inline">
                    <Icon.ChevronRight></Icon.ChevronRight>
                  </div>
                </Nav.Link>
                <Nav.Link
                  href="/transfer"
                  className="accountLink d-block text-decoration-none text-dark">
                  Transfer Funds
                  <div className="ms-3 d-inline">
                    <Icon.ChevronRight></Icon.ChevronRight>
                  </div>
                </Nav.Link>
              </Nav>
            </div>
            <div class="col-md-4">
              {/* <img src="feature3-icon.png" alt="Feature 3" class="img-fluid" /> */}
              <h2>24/7 Support</h2>
              <p className="d-inline">
                Our support team is available around the clock to assist you.
                <Nav>
                  <Nav.Link href="/contact" className="p-0 d-inline">
                    Help
                  </Nav.Link>
                </Nav>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="bg-light py-5">
        <div class="container">
          <h2 class="text-center">Why Choose Us</h2>
          <p class="text-center">
            Discover what sets us apart from the rest. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>
      </section>

      <section id="download" class="py-5">
        <div class="container">
          <div class="text-center">
            <h2>Bank on the Go!</h2>
            <p>Download our app today for a seamless banking experience.</p>
            <a href="#" class="btn btn-primary btn-lg">
              Download Now
            </a>
          </div>
        </div>
      </section>

      <section id="contact" class="bg-light py-5">
        <div class="container">
          <h2 class="text-center">Have Questions or Need Assistance?</h2>
          <p class="text-center">
            <Nav.Link href="/contact" className="p-0 d-inline">
              For support
            </Nav.Link>
            , call us at (123) 456-7890 or email support@yourbank.com
          </p>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { isLoggedIn: state.isLoggedIn };
};
export default connect(mapStateToProps)(Home);
