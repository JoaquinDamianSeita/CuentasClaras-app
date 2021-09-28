//ESTE COMPONENTE ES LA TABLA DEL ABM OPERACIONES

import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import { removeOperation, setOperations } from "../../actions";
import OperationEdit from "./OperationEdit";
import { getToken, deleteToken } from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";

export default function OperationListTable() {
  // Determina si se muestra el modal de editar operacion o no
  const [showEdit, setShowEdit] = useState(false);

  // Almacena temporalmente el id de la operacion a borrar o editar
  const [tempOperationId, setTempOperationId] = useState("");

  // Determina si los filtros estan activos o no
  const [categoryFilter, setCategoryFilter] = useState(false);

  // Determina la categoria por la cual se van a filtrar las operaciones
  const [categoryFilterTemp, setCategoryFilterTemp] = useState(null);

  // Determina si el usuario esta usando la aplicacion desde el celular
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // Detecto si el usuario esta usando la app desde el celular
  function isMobile() {
    if (window.screen.width < 550) {
      setMobile(true);
    }
    if (window.screen.width > 550) {
      setMobile(false);
    }
  }

  // si no hay token lo envio al inicio de todo
  const userToken = getToken();
  if (!userToken) {
    history.push("/");
  }

  const operations = useSelector((state) => {
    return state.operations;
  });

  //Calculo el balance del usuario
  useEffect(async () => {
    await axios
      .get(`/api/operations/balance/`, {
        // Envio el token el usuario
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        //Si hay error con el token lo borro y el usuario inicia sesion otra vez
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

  /* Detecto si el usuario esta desde el celular 
  y tambien actualizo el estado de las operaciones en la store */
  useEffect(() => {
    isMobile();
    dispatch(setOperations());
  }, []);

  function handleCloseEdit() {
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempOperationId(id);
    setShowEdit(true);
  }

  // Se encarga de borrar la operacion seleccionada
  async function handleDelete(operationId) {
    await axios
      .delete(`/api/operations/${operationId}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        //Si hay error con el token lo borro y el usuario inicia sesion otra vez
        if (response.data.error) {
          console.log(response.data.error);
          alert("Ocurrio un error debes iniciar sesion nuevamente");
          deleteToken();
          history.push("/login");
        } else {
          alert(response.data.msg);
          dispatch(removeOperation(operationId));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
  }

  // Cuando apreto el boton fitrar
  function handleSubmitFiltros(event) {
    event.preventDefault();
    if (categoryFilterTemp) {
      setCategoryFilter(true);
    }
  }

  // Cuando apreto el boton limpiar filtros
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
        {/* Si no hay filtros activos muestro esta tabla */}
          {operations.length &&
            !categoryFilter &&
            operations.map((operation) => {
              if (operation.type === "Egreso") {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    {/* Si el numero es mayor a 10000 bajo el tamaño de la fuente */}
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
                        {/* Si el dispositivo no es un celular muestro el boton de borrar */}
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
                    {/* Si el numero es mayor a 10000 bajo el tamaño de la fuente */}
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
                        {/* Si el dispositivo no es un celular muestro el boton de borrar */}
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

          {/* Si hay filtros activos muestro esta tabla */}
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
                    {/* Si el numero es mayor a 10000 bajo el tamaño de la fuente */}
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
                        {/* Si el dispositivo no es un celular muestro el boton de borrar */}
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
                    {/* Si el numero es mayor a 10000 bajo el tamaño de la fuente */}
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
                        {/* Si el dispositivo no es un celular muestro el boton de borrar */}
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
