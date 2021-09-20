import React, { useState } from "react";
import Login from "../forms/Login";

const LoginButton = () => {
  const [showLogin, setShowLogin] = useState(false);

  function handleCloseLogin() {
    setShowLogin(false);
  }

  function handleShowLogin(id) {
    setShowLogin(true);
  }

  return (
    <div>
      <div>
        <Login
          isOpen={showLogin}
          handleCloseLogin={handleCloseLogin}
        ></Login>
      </div>

      <button
        className="btn btn-primary btn-block"
        onClick={() => handleShowLogin()}
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginButton;
