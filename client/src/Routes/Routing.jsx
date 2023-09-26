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
import Account from "../Components/Account";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/about" element={<About />} />
          {/* <Route path="/addUser" element={<AddUSer />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login random="random" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactionList" element={<TransactionHistory />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transfer" element={<Transfer />} />
          {/* <Route path="/accounts" element={<Account />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
