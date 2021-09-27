import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import { removeOperation, setOperations } from "../../actions";
import OperationEdit from "./OperationEdit";
import { getToken, deleteToken } from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";

export default function OperationListTable() {
  const [showEdit, setShowEdit] = useState(false);
  const [tempOperationId, setTempOperationId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [categoryFilterTemp, setCategoryFilterTemp] = useState(null);
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  function isMobile() {
    if (window.screen.width < 550) {
      setMobile(true);
    }
    if (window.screen.width > 550) {
      setMobile(false);
    }
  }

  const userToken = getToken();
  if (!userToken) {
    history.push("/");
  }

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
        if (response.data.error) {
          alert("Ocurrio un error debes iniciar sesion nuevamente");
          deleteToken();
          history.push("/login");
        }
      })
      .catch(function (err) {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    isMobile();
    dispatch(setOperations());
    console.log(window.screen.width);
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

  function handleSubmitFiltros(event) {
    event.preventDefault();
    if (categoryFilterTemp) {
      setCategoryFilter(true);
    }
  }

  function handleCloseFiltros() {
    setCategoryFilter(false);
    window.location.reload();
  }

  function handleChangeFiltros(event) {
    setCategoryFilterTemp(event.target.value);
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

      <form
        onSubmit={handleSubmitFiltros}
        className="background-black form-inline"
        role="form"
      >
        <Row className="filtrosABM">
          <Col lg={3}>
            <label className="form-label">Buscar por categoría:</label>
          </Col>
          <Col lg={5}>
            <select
              class="form-select"
              name="categoryFilterTemp"
              value={categoryFilterTemp}
              onChange={handleChangeFiltros}
            >
              <option selected value={"null"}>
                Seleccionar el tipo de operación
              </option>
              <option disabled value="">
                INGRESO
              </option>
              <option value={"Inversiones"}>Inversiones</option>
              <option value={"Premios"}>Premios</option>
              <option value={"Regalos"}>Regalos</option>
              <option value={"Sueldo"}>Sueldo</option>
              <option value={"Otros"}>Otros</option>
              <option disabled value="">
                EGRESO
              </option>
              <option value={"Alimentación"}>Alimentación</option>
              <option value={"Transporte"}>Transporte</option>
              <option value={"Educación"}>Educación</option>
              <option value={"Entretenimiento"}>Entretenimiento</option>
              <option value={"Facturas"}>Facturas</option>
              <option value={"Nafta"}>Nafta</option>
              <option value={"Hogar"}>Hogar</option>
              <option value={"Ropa"}>Ropa</option>
              <option value={"Salud"}>Salud</option>
            </select>
          </Col>
          <Col lg={4}>
            <div className="btn-group d-flex">
              <input
                type="submit"
                value="Filtrar"
                className="btn btn-success"
              />
              <button
                onClick={() => handleCloseFiltros()}
                className="btn btn-secondary"
              >
                Limpiar filtros
              </button>
            </div>
          </Col>
        </Row>
      </form>

      <hr />

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
            !categoryFilter &&
            operations.map((operation) => {
              if (operation.type === "Egreso") {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>

                    {operation.amount >= 10000 ? (
                      <td style={{ color: "#da222b", fontSize: "14px" }}>
                        ${operation.amount}
                      </td>
                    ) : (
                      <td style={{ color: "#da222b" }}>${operation.amount}</td>
                    )}
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        {mobile ? null : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(operation.id))}
                          >
                            Borrar
                          </button>
                        )}
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
                    {operation.amount >= 10000 ? (
                      <td style={{ color: "#58b324", fontSize: "14px" }}>
                        ${operation.amount}
                      </td>
                    ) : (
                      <td style={{ color: "#58b324" }}>${operation.amount}</td>
                    )}
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        {mobile ? null : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(operation.id))}
                          >
                            Borrar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          {operations.length &&
            categoryFilter &&
            operations.map((operation) => {
              if (
                operation.type === "Egreso" &&
                categoryFilterTemp === operation.category.type
              ) {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    {operation.amount >= 10000 ? (
                      <td style={{ color: "#da222b", fontSize: "14px" }}>
                        ${operation.amount}
                      </td>
                    ) : (
                      <td style={{ color: "#da222b" }}>${operation.amount}</td>
                    )}
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        {mobile ? null : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(operation.id))}
                          >
                            Borrar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
              if (
                operation.type === "Ingreso" &&
                categoryFilterTemp === operation.category.type
              ) {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    {operation.amount >= 10000 ? (
                      <td style={{ color: "#58b324", fontSize: "14px" }}>
                        ${operation.amount}
                      </td>
                    ) : (
                      <td style={{ color: "#58b324" }}>${operation.amount}</td>
                    )}
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleShowEdit(String(operation.id))}
                        >
                          Editar
                        </button>
                        {mobile ? null : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(operation.id))}
                          >
                            Borrar
                          </button>
                        )}
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
