import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: red;
`;
const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background: url("Assets/wave-haikei.svg");
  background-size: cover;
`;

const Home = () => {
  return (
    <Container>
      <Background />
    </Container>
  );
};

export default Home;
