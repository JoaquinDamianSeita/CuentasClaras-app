import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import axios from "axios";
import { removeOperation } from "../../actions";
import OperationInfo from "./OperationInfo";

// import PostInfoModal from "./PostInfoModal";
import { useAuth0 } from "@auth0/auth0-react";

export default function OperationListTable() {
  const [showInfo, setShowInfo] = useState(false);
  const [tempOperationId, setTempOperationId] = useState("");
  const dispatch = useDispatch();

  const operations = useSelector((state) => {
    return state.operations;
  });

  const { getAccessTokenSilently } = useAuth0();

  function handleCloseInfo() {
    setShowInfo(false);
  }

  function handleShowInfo(id) {
    setTempOperationId(id);
    setShowInfo(true);
  }

  async function handleDelete(postId) {
    const token = await getAccessTokenSilently();

    axios
      .delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(removeOperation(postId));
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
        <OperationInfo
          operationId={tempOperationId}
          isOpen={showInfo}
          handleCloseInfo={handleCloseInfo}
        ></OperationInfo>
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
              return (
                <tr key={operation.id}>
                  <td>{operation.type}</td>
                  <td>{operation.concept}</td>
                  <td>{operation.category.type}</td>
                  <td>{operation.amount}$</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleShowInfo(String(operation.id))}
                      >
                        Info
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(String(operation.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
