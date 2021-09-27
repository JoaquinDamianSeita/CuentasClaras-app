import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addOperation } from "../../actions";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getToken, deleteToken } from "../../auth/auth-helper";

export default function OperationAdd(props) {
  const userToken = getToken();
  const history = useHistory();
  let initialState = {
    amount: 0,
    concept: "",
    type: 0,
    categoryId: 0,
  };

  const [operation, setFields] = useState(initialState);
  const [open, setOpen] = useState(props.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  function handleChange(event) {
    setFields({ ...operation, [event.target.name]: event.target.value });
  }

  function CategoriasIngresos() {
    return (
      <select
        required
        class="form-select"
        onChange={handleChange}
        name="categoryId"
        value={operation.categoryId}
      >
        <option selected value={null}>
          Seleccionar la categoria
        </option>
        <option value={10}>Inversiones</option>
        <option value={12}>Premios</option>
        <option value={13}>Regalos</option>
        <option value={14}>Sueldo</option>
        <option value={11}>Otros</option>
      </select>
    );
  }

  function CategoriasEgresos() {
    return (
      <select
        required
        class="form-select"
        onChange={handleChange}
        name="categoryId"
        value={operation.categoryId}
      >
        <option selected value={null}>
          Seleccionar la categoria
        </option>
        <option value={1}>Alimentación</option>
        <option value={2}>Transporte</option>
        <option value={3}>Educación</option>
        <option value={4}>Entretenimiento</option>
        <option value={5}>Nafta</option>
        <option value={6}>Facturas</option>
        <option value={7}>Hogar</option>
        <option value={8}>Ropa</option>
        <option value={9}>Salud</option>
        <option value={11}>Otros</option>
      </select>
    );
  }

  function SelectorDisabled() {
    return (
      <div>
        <select class="form-select" disabled>
          <option selected value={null}>
            Seleccionar la categoria
          </option>
        </select>
        <small>Debes seleccionar un tipo de operación primero</small>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !operation.amount ||
      !operation.concept ||
      operation.type === 0 ||
      !operation.categoryId === null
    ) {
      alert("Debes completar todos los campos para continuar.");
    }
    if (
      operation.amount &&
      operation.concept &&
      operation.type &&
      operation.categoryId
    ) {
      return axios
        .post(
          "/api/operations",
          {
            data: {
              amount: operation.amount,
              concept: operation.concept,
              type: operation.type,
              categoryId: operation.categoryId,
            },
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            alert("Ocurrio un error debes iniciar sesion nuevamente");
            deleteToken();
            history.push("/login");
          } else {
            console.log(response.data);
            dispatch(addOperation(response.data));
            props.handleCloseAdd();
            setFields(initialState);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            `No estas autorizado a realizar esta acción! ${err} Enviar un mensaje a joaquindamianseita@gmail.com`
          );
        });
    }
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseAdd}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="background-black">
          <Modal.Title>Crear Operación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-black">
          <form onSubmit={handleSubmit} className="background-black">
            <div className="form-group">
              <label className="form-label">Monto:</label>
              <input
                type="number"
                name="amount"
                required
                value={operation.amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Concepto:</label>
              <input
                type="text"
                name="concept"
                required
                value={operation.concept}
                onChange={handleChange}
                className="form-control"
                placeholder="Concepto..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo:</label>
              <select
                required
                class="form-select"
                onChange={handleChange}
                name="type"
                value={operation.type}
                defaultValue={0}
              >
                <option selected value={0}>
                  Seleccionar el tipo de operación
                </option>
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Categoría:</label>
              <div className="mb-3">
                {operation.type == 0 ? <SelectorDisabled /> : null}
                {operation.type === "Ingreso" ? <CategoriasIngresos /> : null}
                {operation.type === "Egreso" ? <CategoriasEgresos /> : null}
              </div>
            </div>

            <div className="btn-group d-flex justify-content-center">
              <input
                type="submit"
                value="Confirmar"
                className="btn btn-primary"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
