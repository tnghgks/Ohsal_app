import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-image: url("./img/abstract-6467847.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  justify-content: center;
  align-items: center;
`;

const Article = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AuthContainer = styled.div`
  text-align: center;
  line-height: 50px;
  width: 200px;
  height: 50px;
  background-color: #404eed;
  border-radius: 5px;
  color: white;
  font-size: 18px;
`;
const Span = styled.span`
  margin-left: 10px;
`;
const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 80px;
  height: 80px;
  border-radius: 15px;
`;

const Auth = () => {
  return (
    <Container>
      <Logo className="Logo" src="img/logo.jpg" alt="logo" />
      <Article>
        <AuthContainer>
          <a href="http://localhost:3001/auth">
            <FontAwesomeIcon icon={faDiscord} color="#fff" size="1x" />
            <Span>디스코드 로그인</Span>
          </a>
        </AuthContainer>
      </Article>
    </Container>
  );
};

export default Auth;
