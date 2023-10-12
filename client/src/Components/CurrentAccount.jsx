import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";

const CurrentAccount = () => {
  useEffect(() => {}, []);
  console.log("return Account");

  return (
    <Container>
      <h1>Current Account Component</h1>
    </Container>
  );
};

export default CurrentAccount;
