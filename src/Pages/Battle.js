import React, { useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:3001/");

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #637373;
`;

const H1 = styled.h1``;

const Battle = () => {
  useEffect(() => {
    socket.emit("message", "hi");
  }, []);

  return (
    <Container>
      <H1>Battle</H1>
    </Container>
  );
};

export default Battle;
