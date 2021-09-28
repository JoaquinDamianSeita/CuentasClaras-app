
// COMPONENTE QUE MUESTRA TODO EL ABM OPERACIONES

import React, { useState } from "react";
import OperationListTable from "../operations/OperationListTable";
import OperationAdd from "../operations/OperationAdd";
import { useHistory } from "react-router-dom";

export default function ABM() {
  const history = useHistory();

  const [openAdd, setOpenAdd] = useState(false);

  function handleCloseAdd() {
    setOpenAdd(false);
  }

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  return (
    <div className="text-center mt-5">
      <button
        className="btn btn-secondary d-block mx-auto mt-2 mb-5"
        onClick={() => history.push("/Home")}
      >
        Volver al Inicio
      </button>
      <button className="btn btn-primary btn-lg mb-5" onClick={handleOpenAdd}>
        Agregar Operación
      </button>

      <div>
        <OperationAdd
          isOpen={openAdd}
          handleCloseAdd={handleCloseAdd}
        ></OperationAdd>
      </div>
      <hr />
      <OperationListTable />
    </div>
  );
}
