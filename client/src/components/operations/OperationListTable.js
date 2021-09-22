import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import axios from "axios";
import { removeOperation, setOperations } from "../../actions";
import OperationEdit from "./OperationEdit";
import { getToken, deleteToken } from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";

// import PostInfoModal from "./PostInfoModal";

export default function OperationListTable() {
  const [showEdit, setShowEdit] = useState(false);
  const [tempOperationId, setTempOperationId] = useState("");
  const userToken = getToken();
  const dispatch = useDispatch();
  const history = useHistory();

  const operations = useSelector((state) => {
    return state.operations;
  });

  useEffect(() => {
    axios
      .get(`/api/operations/balance/`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        if (response.data.error){
          alert("Ocurrio un error debes iniciar sesion nuevamente")
          deleteToken();
          history.push("/login");
        }
      })
      .catch(function (err) {
        console.log("error", err);
      });
  },[]);

  useEffect(() => {
    dispatch(setOperations());
  }, []);

  function handleCloseEdit() {
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempOperationId(id);
    setShowEdit(true);
  }

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

  return (
    <div>
      <div>
        <OperationEdit
          operationId={tempOperationId}
          isOpen={showEdit}
          handleCloseEdit={handleCloseEdit}
        ></OperationEdit>
      </div>

      <Table striped bordered hover variant="dark" className="operation-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Concepto</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {operations.length &&
            operations.map((operation) => {
              if (operation.type === "Egreso") {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    <td style={{ color: "#da222b" }}>-${operation.amount}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(String(operation.id))}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    <td style={{ color: "#58b324" }}>${operation.amount}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(String(operation.id))}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>
    </div>
  );
}
