import React from "react";

const Auth = () => {
  return (
    <div className="Wrapper">
      <div className="auth__Container">
        <button
          onClick={() =>
            window.open(
              "http://localhost:3001/auth",
              "_blank",
              "width=500,height=800"
            )
          }
        >
          디스코드 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
