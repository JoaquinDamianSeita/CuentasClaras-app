import React, { useEffect, useState } from "react";
import PostAdd from "../posts/PostAdd";
import PostListTable from "../posts/PostListTable";
import OperationListTable from "../opertions/OperationListTable";

import { useSelector } from "react-redux";

function Heroadmin() {
  const [showAdd, setShowAdd] = useState(false);
  const [showPostTable, setShowPostTable] = useState(false);
  const [showOperationTable, setShowOperationTable] = useState(false);

  const posts = useSelector((state) => {
    return state.posts;
  });

  const operations = useSelector((state) => {
    return state.operations;
  });

  useEffect(() => {
    setShowAdd(false);
  }, posts);

  function handleCloseAdd() {
    setShowAdd(false);
  }
  function handleShowAdd() {
    setShowAdd(true);
  }

  function handleCloseList() {
    setShowPostTable(false);
  }

  function handleCloseListOperations() {
    setShowOperationTable(false);
  }

  function handleShowListOperations() {
    setShowOperationTable(true);
  }

  function handleShowList() {
    setShowPostTable(true);
  }

  return (
    <div>

      <div>
        <OperationListTable
        isOpen={showOperationTable}
        handleCloseListOperations={handleCloseListOperations}
        ></OperationListTable>
      </div>


      <div className="text-center hero">
        <img
          className="mb-3 app-logo"
          src={process.env.PUBLIC_URL + "/images/blog.svg"}
          alt="Blog logo"
          width="120"
        />
        <h1 className="mb-4">Admin Mode</h1>
        <div className="d-flex justify-content-center">
          <p className="lead px-3" style={{ width: 500, textAlign: "center" }}>
            Hola administrador, abajo vas a encontrar un botón que te permite
            publicar posteos nuevos, sin embargo solo los usuarios autorizados
            podrán hacer uso de esta función. Para autorizarte mandar un mail
            acá:
            <a href="mailto:joaquindamianseita@gmail.com">
              joaquindamianseita@gmail.com
            </a>
          </p>
        </div>

        <button className="btn btn-dark mx-1" onClick={handleShowAdd}>
          Crear posteo
        </button>
        <button className="btn btn-dark mx-auto my-1 " onClick={handleShowList}>
          Administrar posteos
        </button>
        <button className="btn btn-dark mx-auto my-1 " onClick={handleShowListOperations}>
          Administrar operations
        </button>
      </div>
    </div>
  );
}

export default Heroadmin;
