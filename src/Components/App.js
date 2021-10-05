import React, { useState, useEffect } from "react";
import Router from "Components/Router";
import Loader from "Components/Loader";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      window.addEventListener("message", function (event) {
        console.log(event);
      });
      const { data } = await axios.get("/auth/authCheck");
      console.log(data);
      setAuth(data);
      setLoading(false);
    };
    authCheck();
  }, []);
  return (
    <>{loading && loading ? <Loader /> : <Router authenticate={auth} />}</>
  );
}

export default App;
