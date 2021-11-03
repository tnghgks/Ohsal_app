import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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

const Nav = styled.nav`
  width: 50px;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  background-color: brown;
  color: #ffeadb;
  padding-top: 10px;
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
  background-color: ${(props) => (props.current ? "#000" : "#fff")};
`;
const Logout = styled.a`
  margin-top: 20px;
`;

const Header = ({ authenticate, setAuth }) => {
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);

  useEffect(() => {
    console.log(history);
    setPath(history.location.pathname);
  }, [history.location.pathname]);

  const handleClick = async (event) => {
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

  return (
    <Nav>
      <FontAwesomeIcon icon={faBars} />
      <Avatar
        id="userAvatar"
        src={`https://cdn.discordapp.com/avatars/${authenticate.discordId}/${authenticate.avatar}.png`}
        alt={authenticate.avatar}
      />
      {authenticate && authenticate ? (
        <Logout href="/" onClick={handleClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Logout>
      ) : (
        ""
      )}
      <Menu>
        <MenuButton to="/" current={path && path === "/"}>
          <FontAwesomeIcon icon={faHome} />
        </MenuButton>
        <MenuButton to="/event" current={path && path === "/event"}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </MenuButton>
        <MenuButton to="/battle" current={path && path === "/battle"}>
          <FontAwesomeIcon icon={faDrumstickBite} />
        </MenuButton>
      </Menu>
    </Nav>
  );
};

export default Header;
