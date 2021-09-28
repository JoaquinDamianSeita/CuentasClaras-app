
//FORMULARIO INICIO DE SESION

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Register from "./Register";
import { setToken } from "../../auth/auth-helper";

export default function Login(props) {
  const history = useHistory();
  let initialState = {
    email: "",
    password: "",
  };
  const [user, setUserFields] = useState(initialState);
  const [open, setOpen] = useState(props.isOpen);
  const [showRegister, setShowRegister] = useState(false);

  function handleCloseSignup() {
    setShowRegister(false);
  }

  function handleOpenSignup() {
    setShowRegister(true);
  }

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  function handleChange(event) {
    setUserFields({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (user.email && user.password) {
      return axios
        .post("/api/users/login", {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          setToken(response.data);
          props.handleCloseLogin();
          history.push("/Home");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(`No se pudo iniciar sesión ${err}`);
        });
    }
  }

  return (
    <div>
      <div>
        <Register
          isOpen={showRegister}
          handleCloseSignup={handleCloseSignup}
        ></Register>
      </div>

      <Modal
        show={open}
        size={"sm"}
        onHide={props.handleCloseLogin}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="background-black">
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-black">
          <form onSubmit={handleSubmit} className="background-black">
            <div className="form-group"></div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                required
                value={user.email}
                onChange={handleChange}
                className="form-control"
                placeholder="test@mail.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label ">Contraseña:</label>
              <input
                type="password"
                name="password"
                required
                value={user.password}
                onChange={handleChange}
                className="form-control mb-4"
                placeholder="qwerty"
              />
            </div>

            <small>
              ¿Nuevo en Cuentas Claras?{"  "}
              <a
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => handleOpenSignup()}
              >
                Registrarse!
              </a>
            </small>

            <div className="btn-group d-flex justify-content-center mt-3 ">
              <input type="submit" value="Enviar" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
