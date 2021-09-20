import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const history = useHistory();
  let initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [user, setUserFields] = useState(initialState);
  const [open, setOpen] = useState(props.isOpen);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  function handleChange(event) {
    setUserFields({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(user);

    if (user.email && user.password && user.username) {
      return axios
        .post("/api/users/register", {
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .then(() => {
          props.handleCloseSignup();
        })
        .catch((err) => {
          console.log(err);
          alert(`No se pudo crear la cuenta ${err}`);
        });
    }
  }

  return (
    <div>
      <Modal
        show={open}
        size={"sm"}
        onHide={props.handleCloseSignup}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="background-black">
          <Modal.Title>Registrar cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-black">
          <form onSubmit={handleSubmit} className="background-black">
            <div className="form-group"></div>
            <div className="form-group">
              <label className="form-label">Nombre de usuario:</label>
              <input
                type="text"
                name="username"
                required
                value={user.username}
                onChange={handleChange}
                className="form-control"
                placeholder="usuario123"
              />
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

            <p>Ya tienes una cuenta? Iniciar sesión</p>

            <div className="btn-group d-flex justify-content-center">
              <input type="submit" value="Enviar" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
