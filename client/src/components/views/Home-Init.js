import React from "react";
import { useHistory } from "react-router-dom";

export default function HomeInit() {
  const history = useHistory();
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

      <button
        className="btn btn-primary btn-block"
        onClick={() => history.push("/login")}
      >
        Iniciar Sesión
      </button>
      <hr />
    </div>
  );
}
