import axios from "axios";
import React, { useEffect, useState } from "react";
import OperationAdd from "../opertions/OperationAdd";

const Hero = () => {
  const [userBalance, setUserBalance] = useState("");
  const userId = 1;

  const [openAdd, setOpenAdd] = useState(false);

  function handleCloseAdd() {
    setOpenAdd(false);
  }
  
  function handleOpenAdd() {
    setOpenAdd(true);
  }


  useEffect(() => {
    axios
      .get(`/api/operations/balance/${userId}`)
      .then((response) => {
        setUserBalance(response.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
  });

  return (
    <div className="text-center hero">
      <img
        className="mb-3 app-logo"
        src={process.env.PUBLIC_URL + "/images/blog.svg"}
        alt="Blog logo"
        width="120"
      />
      <h1 className="mb-4">Bienvenido user.name!</h1>

      <small className="lead mb-2">
        ¿No sos user.name? Para iniciar sesión con otro usuario click{" "}
        <a href="#">aquí!</a>
      </small>

      <h3 className="mb-2">Saldo en la cuenta:</h3>
      <h1 className="mb-4">${userBalance}</h1>

      <button className="btn btn-primary btn-lg" onClick={handleOpenAdd}>
        Agregar Operación
      </button>
      <div>
        <OperationAdd
          isOpen={openAdd}
          handleCloseAdd={handleCloseAdd}
        ></OperationAdd>
      </div>

      <hr />
    </div>
  );
};

export default Hero;
