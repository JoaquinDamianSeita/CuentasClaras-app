import React from "react";

import LoginButton from "./Login-button";
import LogoutButton from "./Logout-button";
import SignupButton from "./Signup-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <LoginButton /> <SignupButton />
    </div>
  ) : (
    <div>
      <LoginButton /> <SignupButton />
    </div>
  );
};

export default AuthenticationButton;
