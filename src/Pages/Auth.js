import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  return (
    <div className="Wrapper">
      <img className="Logo" src="img/logo.jpg" alt="logo"></img>
      <article>
        <div className="auth__Container">
          <a href="http://localhost:3001/auth">
            <FontAwesomeIcon icon={faDiscord} color="#fff" size="1x" />
            <span>디스코드 로그인</span>
          </a>
        </div>
      </article>
    </div>
  );
};

export default Auth;
