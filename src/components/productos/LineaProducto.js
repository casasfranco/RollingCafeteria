import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const LineaProducto = (props) => {
  const eliminarProducto = (id) => {
    console.log(id);

    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
      text: "No puedes recuperar un producto eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.value) {
        //Elimino el producto
        try {
          const resultado = await fetch(
            `https://backendcafeteria.herokuapp.com/api/cafeteria/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          console.log(resultado);
          if (resultado.status === 200) {
            Swal.fire(
              "Producto eliminado!",
              "Su producto fue correctamente eliminado.",
              "success"
            );
          }

          //Recargar la lista de productos
          props.setRecargarProductos(true);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.product.nombreProd}
        <span className="ml-1">$ {props.product.precioProd}</span>
      </p>
      <div>
        <Link
          className="btn btn-warning"
          to={`/productos/editar/${props.product._id}`}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <Button
          variant="danger"
          onClick={() => eliminarProducto(props.product._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default LineaProducto;
