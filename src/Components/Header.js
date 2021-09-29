import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
      </ul>
    </nav>
  );
};

export default Header;
