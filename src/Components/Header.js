import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faCalendarAlt,
  faDrumstickBite,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.nav`
  width: ${(props) => (props.$toggle ? "200px" : "60px")};
  height: 100vh;
  position: relative;
  display: flex;
  min-width: ${(props) => (props.$toggle ? "200px" : "60px")};
  align-items: left;
  font-size: 20px;
  background-color: brown;
  color: #ffeadb;
  transition: 0.5s;
`;
const SubContainer = styled.div`
  width: ${(props) => (props.$toggle ? "200px" : "60px")};
  height: 100vh;
  display: flex;
  align-items: left;
  flex-direction: column;
  font-size: 20px;
  background-color: brown;
  color: #ffeadb;
  padding: 10px;
  transition: 0.5s;
`;
const ToggleBox = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AvatarCotainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: left;
  align-items: center;
`;
const Avatar = styled.img`
  width: 200px;
  margin: 15px 0px;
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;
const UserName = styled.span`
  width: 150px;
  margin-left: 15px;
  opacity: ${(props) => (props.$toggle ? "1" : "0")};
  transition: 0.3s;
`;

const Menu = styled.ul`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Button = styled(Link)`
  text-align: center;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px;
  line-height: 40px;
  width: ${(props) => (props.$toggle ? "180px" : "40px")};
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => (props.$current ? "#000" : "#333")};
  margin: 5px 0px;
  transition: 0.5s;
  &:after {
    margin: 0 auto;
    transition-timing-function: step-end;
    transition-duration: 0.3s;
    opacity: ${(props) => (props.$toggle ? "1" : "0")};
    content: ${(props) => (props.$toggle ? "'버튼'" : "''")};
    font-size: 11px;
  }
  &:hover {
    background-color: red;
    &:after {
      ${(props) =>
        props.$toggle ||
        css`
          position: absolute;
          right: -110px;
          width: 100px;
          height: 40px;
          border-radius: 15px;
          border: solid 3px #000;
          opacity: 1;
          background-color: #000;
          content: "버튼";
        `}
    }
  }
`;

const HomeButton = styled(Button)`
  &:after {
    content: ${(props) => (props.$toggle ? "'홈'" : "''")};
  }
  &:hover {
    &:after {
      ${(props) =>
        props.$toggle ||
        css`
          content: "홈";
        `}
    }
  }
`;
const EventButton = styled(Button)`
  &::after {
    content: ${(props) => (props.$toggle ? "'이벤트'" : "''")};
  }
  &:hover {
    &:after {
      ${(props) =>
        props.$toggle ||
        css`
          content: "이벤트";
        `}
    }
  }
`;
const BattleButton = styled(Button)`
  &::after {
    content: ${(props) => (props.$toggle ? "'내전진행'" : "''")};
  }
  &:hover {
    &:after {
      ${(props) =>
        props.$toggle ||
        css`
          content: "내전진행";
        `}
    }
  }
`;
const LogoutButton = styled(Button)`
  &::after {
    content: ${(props) => (props.$toggle ? "'로그아웃'" : "''")};
  }
  &:hover {
    &:after {
      ${(props) =>
        props.$toggle ||
        css`
          content: "로그아웃";
        `}
    }
  }
`;

const Header = ({ authenticate, setAuth, location }) => {
  const history = useHistory();
  const [path, setPath] = useState(location.pathname);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setPath(location.pathname);
    return () => setPath(location.pathname);
  }, [location]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get("/auth/logout");
      if (!data) {
        setAuth(data);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleMenuClick = () => {
    setToggle((toggle) => !toggle);
  };

  return (
    <Container $toggle={toggle}>
      <SubContainer $toggle={toggle}>
        <ToggleBox $toggle={toggle}>
          <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
        </ToggleBox>
        <AvatarCotainer>
          <Avatar
            id="userAvatar"
            src={`https://cdn.discordapp.com/avatars/${authenticate.discordId}/${authenticate.avatar}.png`}
            alt={authenticate.avatar}
          />
          <UserName $toggle={toggle}>{authenticate.nickname}</UserName>
        </AvatarCotainer>

        {authenticate && authenticate ? (
          <LogoutButton to="/" onClick={handleLogout} $toggle={toggle}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </LogoutButton>
        ) : (
          ""
        )}
        <Menu>
          <HomeButton $toggle={toggle} to="/" $current={path && path === "/"}>
            <FontAwesomeIcon icon={faHome} />
          </HomeButton>
          <EventButton
            $toggle={toggle}
            to="/event"
            $current={path && path === "/event"}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </EventButton>
          <BattleButton
            $toggle={toggle}
            to="/battle"
            $current={path && path === "/battle"}
          >
            <FontAwesomeIcon icon={faDrumstickBite} />
          </BattleButton>
        </Menu>
      </SubContainer>
    </Container>
  );
};

export default withRouter(Header);
