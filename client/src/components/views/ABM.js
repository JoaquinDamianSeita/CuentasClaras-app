import React, { useEffect, useState } from "react";
import OperationListTable from "../operations/OperationListTable";
import OperationAdd from "../operations/OperationAdd";

export default function ABM() {
  const userId = 1;

  const [openAdd, setOpenAdd] = useState(false);

  function handleCloseAdd() {
    setOpenAdd(false);
  }

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  return (
    <div className="text-center">
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
