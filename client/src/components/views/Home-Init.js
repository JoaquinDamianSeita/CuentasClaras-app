import React from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../auth/auth-helper";

export default function HomeInit() {
  const userToken = getToken();
  const history = useHistory();

  function IniciarSesion() {
    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          history.push("/login");
          window.location.reload();
        }}
      >
        Iniciar Sesión
      </button>
    );
  }

  function IrHome() {
    return (
      <button
        className="btn btn-success btn-block"
        onClick={() => {
          history.push("/Home");
          window.location.reload();
        }}
      >
        Ir a operaciones
      </button>
    );
  }

  return (
    <div className="text-center hero">
      <img
        className="mb-3 app-logo"
        src={process.env.PUBLIC_URL + "/images/money_4.svg"}
        alt="Blog logo"
        width="120"
      />
      <h1 className="mb-4 display-5">¡Bienvenido a Cuentas Claras!</h1>

      <h4 className="mb-3">Para comenzar debes iniciar sesión</h4>

      {userToken ? <IrHome /> : <IniciarSesion />}

      <hr />
    </div>
  );
}
