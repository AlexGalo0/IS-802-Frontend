/*
Esta es solo una representacion de como funcionaria el componente de MostrarProductos
*/

import React, { useEffect, useState } from "react";
import { CartaProducto } from "./CartaProducto";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { PruebaProductos } from "./PruebaProductos";
import "./prueba.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image, Alert } from "react-bootstrap";

import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";

export const MostrarProducto = () => {
  //Hacer peticion de todos los datos
  const [productInfo, setProductInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const URL = `http://localhost:4000/product`;
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((product) => {
        setProductInfo(product); //Esto en teoria , deberia ser un arreglo con 9 productos
      });
  }, []);

  const pruebaArray = ["a", "b", "c", "d", "e"];
  const productosJSON = [
    {
      NOMBRE: "producto 1",
      precio: "producto 2,",
      descripcion: "producto 3",
    },
  ];

  return (
    <>
      <header className="App-header">
        <Container className="ContainerPueba">
          <form fluid="true" className="FormPueba">
            <button
              className="Button-backProduct"
              type="submit"
              style={{
                paddingTop: "1px",
              }}
            >
              <BiLeftArrow />
            </button>
            <h1>Productos Ingresados: </h1>
            {
              //Falta el key que me retornara producto
              productosJSON.map((product) => (
                // <CartaProducto key={uuidv4()} {...product} />
                <PruebaProductos info={product} />
              ))
            }
          </form>
        </Container>
      </header>
    </>
  );
};
