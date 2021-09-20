import React, { useState } from "react";
import Register from "../forms/Register";

const SignupButton = () => {
  const [showSignup, setShowSignup] = useState(false);

  function handleCloseSignup() {
    setShowSignup(false);
  }

  function handleShowSignup(id) {
    setShowSignup(true);
  }

  return (
    <div>
      <div>
        <Register
          isOpen={showSignup}
          handleCloseSignup={handleCloseSignup}
        ></Register>
      </div>

      <button
        className="btn btn-warning btn-block"
        onClick={() => handleShowSignup()}
      >
        Registrarse
      </button>
    </div>
  );
};

export default SignupButton;
