import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Componentes
import Inicio from "./components/principal/Inicio.js";
import ListaProductos from "./components/productos/ListaProductos.js";
import EditarProducto from "./components/productos/EditarProducto.js";
import AgregarProducto from "./components/productos/AgregarProducto.js";
import Header from "./components/common/Header.js";
import Footer from "./components/common/Footer.js";
import Erorr404 from "./components/error/Error404.js";

function App() {
  const [productosAPI, setProductosAPI] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos]);

  const consultarAPI = async () => {
    try {
      const respuesta = await fetch("http://localhost:4000/api/cafeteria");
      const resultado = await respuesta.json();
      console.log(resultado);
      setProductosAPI(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListaProductos
            productosAPI={productosAPI}
            setRecargarProductos={setRecargarProductos}
          ></ListaProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto
            setRecargarProductos={setRecargarProductos}
          ></AgregarProducto>
        </Route>
        <Route
          exact
          path="/productos/editar/:id"
          render={(props) => {
            //Obtener id de la url
            const idProducto = props.match.params.id;
            console.log("Parametro de la url:" + idProducto);
            //Filtrar el arreglo de productos
            const productoEncontrado = productosAPI.find(
              (producto) => producto._id === idProducto
            );
            console.log(productoEncontrado);
            return (
              <EditarProducto
                productoEncontrado={productoEncontrado}
                setRecargarProductos={setRecargarProductos}
              ></EditarProducto>
            );
          }}
        ></Route>
        <Route exact path="*">
          <Erorr404></Erorr404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
