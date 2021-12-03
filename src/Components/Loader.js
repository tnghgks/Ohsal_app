import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const H1 = styled.h1`
  color: white;
`;

const Loader = () => {
  return (
    <Container>
      <H1>Loading...</H1>
    </Container>
  );
};

export default Loader;
