import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; //Sirve para redireccionar una pag

const EditarProducto = (props) => {
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef("");

  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const leerCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Revisar si cambio la categoria
    let _categoria =
      categoria === "" ? props.productoEncontrado.categoria : categoria;

    console.log(_categoria);
    console.log(nombreProductoRef.current.value);
    console.log(precioProductoRef.current.value);
    //Validar klos datos
    if (
      nombreProductoRef.current.value.trim() === "" ||
      precioProductoRef.current.value.trim() === "" ||
      _categoria === ""
    ) {
      //Mostrar el cartel de error
      setError(true);
      return;
    }
    //Aqui ya tengo los datos validados
    setError(false);
    //Obtengo los nuevos datos del formulario y envio la modificacion
    const productoEditado = {
      nombreProd: nombreProductoRef.current.value,
      precioProd: precioProductoRef.current.value,
      categoria: _categoria,
    };

    //Enviar datos
    try {
      //enviar el request
      const consulta = await fetch(
        `https://backendcafeteria.herokuapp.com/api/cafeteria/${props.productoEncontrado._id}`,
        {
          method: "PUT",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoEditado),
        }
      );

      console.log(consulta);
      if(consulta.status === 200){
        Swal.fire(
          "Producto editado",
          "El producto se editó correctamente",
          "success"
        );
      }
      //Recargar la API de produtos
      props.setRecargarProductos(true);

      //redirecciona
      props.history.push("/productos");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form className="w-75 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-center my-5">Editar producto</h1>

        {error ? (
          <Alert variant={"danger"}>Todos los campos son obligatorios.</Alert>
        ) : null}

        <Form.Group controlId="nombreProducto">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Medialunas"
            name="nombre"
            ref={nombreProductoRef}
            defaultValue={props.productoEncontrado.nombreProd}
          />
        </Form.Group>
        <Form.Group controlId="precioProducto">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 15"
            name="precio"
            ref={precioProductoRef}
            defaultValue={props.productoEncontrado.precioProd}
          />
        </Form.Group>
        <h3 className="text-center">Categoria</h3>
        <div className="text-center my-4">
          <Form.Check
            inline
            type="radio"
            label="Bebida caliente"
            value="bebida-caliente"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={
              props.productoEncontrado.categoria === "bebida-caliente"
            }
          />
          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            value="bebida-fria"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={
              props.productoEncontrado.categoria === "bebida-fria"
            }
          />
          <Form.Check
            inline
            type="radio"
            label="Salado"
            value="salado"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={props.productoEncontrado.categoria === "salado"}
          />
          <Form.Check
            inline
            type="radio"
            label="Dulce"
            value="dulce"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={props.productoEncontrado.categoria === "dulce"}
          />
        </div>
        <Button variant="primary" type="submit" className="w-100">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(EditarProducto);
