
//ESTA ES UNA TABLA MAS SENCILLA PARA EL INICIO QUE MUESTRA LAS ULTIMAS 10 OPERACIONES

import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { setOperations } from "../../actions";


export default function OperationCards() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOperations());
  },[]);

  const operations = useSelector((state) => {
    return state.operations;
  });


  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="operation-table-home"
      >
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Concepto</th>
            <th>Categoría</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {operations.length &&
          // ACA LIMITO LA CANTIDAD DE OPERACIONES QUE SE VAN A MOSTRAR EN LA TABLA
            operations.slice(0, 9).map((operation) => {
              if (operation.type === "Egreso") {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    <td style={{ color: "#da222b" }}>-${operation.amount}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={operation.id}>
                    <td>{operation.type}</td>
                    <td>{operation.concept}</td>
                    <td>{operation.category.type}</td>
                    <td style={{ color: "#58b324" }}>${operation.amount}</td>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>
    </div>
  );
}
