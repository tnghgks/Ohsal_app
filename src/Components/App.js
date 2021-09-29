import React, { useState } from "react";
import Router from "Components/Router";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      <Router authenticate={auth} />
    </>
  );
}

export default App;
