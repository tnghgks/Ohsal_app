import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
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
  width: ${(props) => (props.$toggle ? "200px" : "50px")};
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: left;
  font-size: 20px;
  background-color: brown;
  color: #ffeadb;
`;
const SubContainer = styled.nav`
  width: ${(props) => (props.$toggle ? "200px" : "50px")};
  height: 100vh;
  display: flex;
  align-items: left;
  flex-direction: column;
  font-size: 20px;
  background-color: brown;
  color: #ffeadb;
  padding: 10px;
`;
const Avatar = styled.img`
  margin-top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;

const Menu = styled.ul`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled(Link)`
  text-align: center;
  line-height: 40px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => (props.$current ? "#000" : "#fff")};
`;
const Logout = styled.a`
  width: ${(props) => (props.$toggle ? "100px" : "auto")};
  margin-top: 20px;
  &::after {
    content: "로그아웃";
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
        <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
        <Avatar
          id="userAvatar"
          src={`https://cdn.discordapp.com/avatars/${authenticate.discordId}/${authenticate.avatar}.png`}
          alt={authenticate.avatar}
        />
        {authenticate && authenticate ? (
          <Logout href="/" onClick={handleLogout} $toggle={toggle}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Logout>
        ) : (
          ""
        )}
        <Menu>
          <MenuButton to="/" $current={path && path === "/"}>
            <FontAwesomeIcon icon={faHome} />
          </MenuButton>
          <MenuButton to="/event" $current={path && path === "/event"}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </MenuButton>
          <MenuButton to="/battle" $current={path && path === "/battle"}>
            <FontAwesomeIcon icon={faDrumstickBite} />
          </MenuButton>
        </Menu>
      </SubContainer>
    </Container>
  );
};

export default withRouter(Header);
