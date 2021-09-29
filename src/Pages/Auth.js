import React from "react";

const Auth = () => {
  return (
    <div className="auth__Container">
      <form className="authForm">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="로그인" />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default Auth;
