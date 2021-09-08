import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";

import { setOperation, replaceOperation } from "../../actions";

export default function OperationEdit(props) {
  const [open, setOpen] = useState(props.isOpen);
  const dispatch = useDispatch();

  const initialState = useSelector((state) => state.operation);
  const [operation, changeOperation] = useState(initialState) 

  const userId = 1;

  useEffect( () => {
    changeOperation(initialState)
  },[props.operationId]);

  useEffect(() => {
    function traerOperation() {
      // const token = await getAccessTokenSilently();
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // }
      axios
        .get(`/api/operations/${userId}/${props.operationId}`)
        .then((response) => {
          dispatch(setOperation(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.log(("error", error));
        });
    }
    traerOperation();
  }, [dispatch, props]);




  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  function handleChange(event) {
    setOperation({
      ...operation,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    axios
      .put(`/api/operations/${props.operationId}`, {
        data: {
          amount: operation.amount,
          concept: operation.concept,
        },
      })
      .then(() => {
        dispatch(setOperation(operation));
        dispatch(replaceOperation(operation));
        window.location.reload();
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
      <Modal
        show={open}
        onHide={props.handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="background-black">
          <Modal.Title>Editar operación</Modal.Title>
        </Modal.Header>

        <Modal.Body className="background-black">
          <form onSubmit={handleSubmit} className="background-black">
            <Form.Label>Concepto:</Form.Label>
            <Form.Control
              type="text"
              name="concept"
              defaultValue={initialState.concept}
              onChange={handleChange}
            ></Form.Control>

            <Form.Label>Monto:</Form.Label>
            <Form.Control
              type="text"
              name="amount"
              defaultValue={initialState.amount}
              onChange={handleChange}
            ></Form.Control>
          </form>

          <div className="btn-group d-flex justify-content-center mt-4">
            <input
              type="submit"
              value="Confirmar Cambios"
              className="btn btn-primary"
              onClick={handleSubmit}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="background-black">
          <button className="btn btn-danger" onClick={props.handleCloseEdit}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
