import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #637373;
`;

const H1 = styled.h1``;

const Battle = () => {
  return (
    <Container>
      <H1>Battle</H1>
    </Container>
  );
};

export default Battle;
