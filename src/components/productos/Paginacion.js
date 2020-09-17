import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginacion(props) {
  console.log(props.paginaActual, props.totalPaginas);
  let active = props.paginaActual; //boton presionado (pagina en la que estoy)
  let items = [];
  for (let number = 0; number <= props.totalPaginas; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => props.consultarAPI(number)}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default Paginacion;
