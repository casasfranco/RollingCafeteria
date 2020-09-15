import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; //Sirve para redireccionar una pag

const AgregarProducto = (props) => {
  //States

  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  //Funciones
  const leerCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validación de los campos

    if (
      nombreProd.trim() === "" ||
      precioProd.trim() === "" ||
      categoria.trim() === ""
    ) {
      //mostrar un cartel de error
      setError(true);
      return;
    }

    setError(false);
    //Agregar mi producto nuevo

    //Preparar el objeto o datos que voy a enviar
    const datos = {
      nombreProd,
      precioProd,
      categoria,
    };

    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };

      const resultado = await fetch(
        "http://localhost:4000/api/cafeteria",
        cabecera
      );
      console.log(resultado);
      //Compruebo la respuesta
      if (resultado.status === 201) {
        Swal.fire(
          "Producto creado",
          "El producto se creo correctamente",
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
        <h1 className="text-center my-5">Agregar producto nuevo</h1>

        {error ? (
          <Alert variant={"danger"}>Todos los campos son obligatorios.</Alert>
        ) : null}

        <Form.Group controlId="nombreProducto">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Medialunas"
            name="nombre"
            onChange={(e) => setNombreProd(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="precioProducto">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 15"
            name="nombre"
            onChange={(e) => setPrecioProd(e.target.value)}
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
          />
          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            value="bebida-fria"
            name="categoria"
            onChange={leerCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Salado"
            value="salado"
            name="categoria"
            onChange={leerCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Dulce"
            value="dulce"
            name="categoria"
            onChange={leerCategoria}
          />
        </div>
        <Button variant="primary" type="submit" className="w-100">
          Agregar
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(AgregarProducto);
