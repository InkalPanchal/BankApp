import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import About from "../Components/About";
import Contact from "../Components/Contact";
// import AddUSer from "../Components/Register";
import Login from "../Components/Login";
import Register from "../Components/Register";
import TransactionHistory from "../Components/TransactionHistory";
import Deposit from "../Components/Deposit";
import Transfer from "../Components/Transfer";
import ForgotPassword from "../Components/ForgotPasswrod";
import ResetPasswordForm from "../Components/ResetPassword";
import HomeComponent from "../Components/HomeComponent";
import SavingAccount from "../Components/SavingAccount";
import CurrentAccount from "../Components/CurrentAccount";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/home" element={<HomeComponent />} />

          <Route path="/about" element={<About />} />
          {/* <Route path="/addUser" element={<AddUSer />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login random="random" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactionList" element={<TransactionHistory />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route path="/saving-account" element={<SavingAccount />} />
          <Route path="/current-account" element={<CurrentAccount />} />
        </Route>
        <Route path="/resetPassword/:token" element={<ResetPasswordForm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
