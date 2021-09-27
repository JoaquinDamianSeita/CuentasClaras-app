import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { setOperation, replaceOperation, removeOperation } from "../../actions";
import { getToken, deleteToken } from "../../auth/auth-helper";

export default function OperationInfo(props) {
  const [open, setOpen] = useState(props.isOpen);
  const initialState = useSelector((state) => state.operation);
  const [operation, changeOperation] = useState(initialState);
  const userToken = getToken();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    function traerOperation() {
      if (!props.operationId) {
        console.log("Todavia no se selecciono una operacion");
      } else {
        axios
          .get(`/api/operations/oneOperation/${props.operationId}`, {
            headers: {
              Authorization: userToken,
            },
          })
          .then((response) => {
            if (response.data.error) {
              alert("Ocurrio un error debes iniciar sesion nuevamente");
              deleteToken();
              history.push("/login");
            } else {
              dispatch(setOperation(response.data));
              changeOperation(response.data);
            }
          })
          .catch((error) => {
            console.log(("error", error));
          });
      }
    }
    traerOperation();
  }, [dispatch, props]);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  async function handleDelete(operationId) {
    axios
      .delete(`/api/operations/${operationId}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Ocurrio un error debes iniciar sesion nuevamente");
          deleteToken();
          history.push("/login");
        }
        dispatch(removeOperation(operationId));
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
  }

  function handleChange(event) {
    changeOperation({
      ...operation,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    axios
      .put(
        `/api/operations/${props.operationId}`,
        {
          data: {
            amount: operation.amount,
            concept: operation.concept,
            id: props.operationId,
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
          dispatch(setOperation(operation));
          dispatch(replaceOperation(operation));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
    props.handleCloseEdit();
  }

  return (
    <div>
      {operation.type && (
        <Modal
          show={open}
          onHide={props.handleCloseEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="background-black">
            <Modal.Title>{operation.type}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="background-black">
            <form onSubmit={handleSubmit} className="background-black">
              <Form.Label>Concepto:</Form.Label>
              <Form.Control
                type="text"
                name="concept"
                value={operation.concept}
                onChange={handleChange}
              ></Form.Control>

              <Form.Label>Monto:</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                value={operation.amount}
                onChange={handleChange}
              ></Form.Control>
            </form>

            <div className="btn-group mt-3 mx-5 d-flex justify-content-center">
              <input
                type="submit"
                value="Confirmar Cambios"
                className="btn btn-primary"
                onClick={handleSubmit}
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(String(operation.id))}
              >
                Borrar
              </button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
