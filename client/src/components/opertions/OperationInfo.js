import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";

import { setOperation, removeOperation } from "../../actions";

import OperationEdit from "./OperationEdit";

export default function OperationInfo(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [showEdit, setShowEdit] = useState(false);
  const [tempOperationId, setTempOperationId] = useState("");
  const dispatch = useDispatch();

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
        })
        .catch((error) => {
          console.log(("error", error));
        });
    }
    traerOperation();
  }, [dispatch, props]);

  const operation = useSelector((state) => state.operation);

  const userId = 1;

  function handleCloseEdit() {
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempOperationId(id);
    setShowEdit(true);
  }

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  async function handleDelete() {
    // const token = await getAccessTokenSilently();
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // }

    axios
      .delete(`/api/operations/${operation._id}`)
      .then(() => {
        dispatch(removeOperation(operation._id));
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
    props.handleCloseInfo();
  }

  return (
    <div>
      <div>
        <OperationEdit
          operationId={tempOperationId}
          isOpen={showEdit}
          handleCloseEdit={handleCloseEdit}
        ></OperationEdit>
      </div>

      {operation.type && (
        <Modal
          show={open}
          onHide={props.handleCloseInfo}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="background-black">
            <Modal.Title>{operation.type}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="background-black">
            <Form>
              <Form.Group>
                <Form.Label>Concepto:</Form.Label>
                <Form.Control value={operation.concept} readOnly></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Categoría:</Form.Label>
                <Form.Control
                  value={operation.category.type}
                  readOnly
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Monto:</Form.Label>
                <Form.Control
                  value={"$" + operation.amount}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </Form>

            <div className="btn-group mt-3 mx-5 d-flex justify-content-center">
              <button
                className="btn btn-warning"
                onClick={() => handleShowEdit(String(props.operationId))}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleDelete}
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
