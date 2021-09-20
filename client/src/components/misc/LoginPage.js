import React from "react";
import Login from "../forms/Login";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();

  function handleCloseLogin() {
    history.push("/")
  };

  return (
    <div>
      <div>
        <Login isOpen={true} handleCloseLogin={handleCloseLogin}></Login>
      </div>
    </div>
  );
}
