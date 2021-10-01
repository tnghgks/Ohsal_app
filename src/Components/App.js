import React, { useState, useEffect } from "react";
import Router from "Components/Router";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);

  const authCheck = async () => {
    const { data } = await axios.get("/auth/authCheck");
    setAuth(data);
  };
  useEffect(authCheck);
  return (
    <>
      <Router authenticate={auth} />
    </>
  );
}

export default App;
