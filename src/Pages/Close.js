import React, { useEffect } from "react";

const Close = () => {
  useEffect(() => {
    console.log("hi");
    const params = window.location.search;
    if (window.opener) {
      window.opener.postMessage(params);
      console.log(params);
      window.close();
    } else {
      alert("No opener");
    }
  }, []);
  return console.log(window.opener);
};

export default Close;
