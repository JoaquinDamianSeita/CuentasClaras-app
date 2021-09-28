
//COMPONENTE PARTE SUPERIOR DEL INICIO

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken, getUserName, deleteToken } from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";

const Hero = () => {
  const [userBalance, setUserBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const userName = getUserName();
  const userToken = getToken();
  if (!userToken || !userName) {
    history.push("/");
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/operations/balance/`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert("Ocurrio un error debes iniciar sesion nuevamente");
          deleteToken();
          history.push("/login");
        }
        setUserBalance(response.data);
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log("error", err);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="text-center hero">
        <img
          className="mb-3 app-logo"
          src={process.env.PUBLIC_URL + "/images/money_4.svg"}
          alt="Blog logo"
          width="80"
        />
        <h1 className="mb-3 display-3">¡Hola {userName}!</h1>

        <small
          style={{ fontSize: "16px" }}
          className="lead mb-4 lead text-muted d-block"
        >
          ¿No sos {userName}? Para iniciar sesión con otro usuario click{" "}
          <a
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => history.push("/login")}
          >
            aquí
          </a>
        </small>

        <button
          className="btn btn-success"
          onClick={() => history.push("/ABM")}
        >
          Administrar Operaciones
        </button>

        <h3 className="mb-2 mt-4">Saldo en la cuenta:</h3>
        <h2 className="mb-4">${userBalance}</h2>

        <hr />
      </div>
    );
  }
};

export default Hero;
