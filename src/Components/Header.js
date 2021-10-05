import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({ authenticate }) => {
  const handleClick = async () => {
    await axios.get("/auth/logout");
  };

  return (
    <nav>
      <ul>
        <Link to="/">
          <li>홈</li>
        </Link>
        <Link to="/event">
          <li>이벤트</li>
        </Link>
        <Link to="/battle">
          <li>내전안내</li>
        </Link>
        {authenticate && authenticate ? (
          <a href="/" onClick={handleClick}>
            로그아웃
          </a>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default Header;
