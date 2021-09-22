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
  },[]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="text-center hero">
        <img
          className="mb-3 app-logo"
          src={process.env.PUBLIC_URL + "/images/blog.svg"}
          alt="Blog logo"
          width="120"
        />
        <h1 className="mb-4">Bienvenido {userName}!</h1>

        <small className="lead mb-2">
          ¿No sos user.name? Para iniciar sesión con otro usuario click{" "}
          <a href="#">aquí!</a>
        </small>

        <h3 className="mb-2">Saldo en la cuenta:</h3>
        <h1 className="mb-4">${userBalance}</h1>

        <hr />
      </div>
    );
  }
};

export default Hero;
