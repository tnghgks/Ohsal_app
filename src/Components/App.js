import React, { useState, useEffect, createContext } from "react";
import Router from "Components/Router";
import Loader from "Components/Loader";
import axios from "axios";
import { AppContext } from "Context/AppContext";

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/auth/authCheck");
      setAuth(data);
      setLoading(false);
    };
    getUser();
  }, []);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <AppContext.Provider value={auth}>
          <Router authenticate={auth} setAuth={setAuth} />
        </AppContext.Provider>
      )}
    </>
  );
}

export default App;
