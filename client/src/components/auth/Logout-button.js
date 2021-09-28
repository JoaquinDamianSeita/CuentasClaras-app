
//BOTON CERRAR SESION

import React from "react";
import { useHistory } from "react-router-dom";
import { deleteToken } from "../../auth/auth-helper";

const LogoutButton = () => {
  const history = useHistory();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() => {
        deleteToken();
        history.push("/");
        window.location.reload();
      }}
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
