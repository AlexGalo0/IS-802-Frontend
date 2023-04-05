import React, { useEffect, useState } from "react";
import {
  Container,
  Accordion,
  Form,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

export const CartaFavoritos = ({
  nombre,
  precio,
  imagenes,

  cantidad,
  nombrecategoria,
  departamento,
}) => {
  const [primeraImagen, setPrimeraImagen] = useState("");
  useEffect(() => {
    const primeraImagen = JSON.parse(imagenes);
    setPrimeraImagen(primeraImagen[0]);
  });

  const renderTooltipBorrar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Borrar producto
    </Tooltip>
  );

  return (
    <Col>
      <Card className="card">
        <Container className="card-container">
          <Card.Img variant="top" src={primeraImagen} className="card-image" />
        </Container>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{nombre}</Card.Title>
          <Card.Text className="card-medium">
            <BsCurrencyDollar style={{ marginTop: "-2px", fontSize: "20px" }} />{" "}
            {precio}
          </Card.Text>
          {/* <Card.Text className="card-medium">Categoria : {nombrecategoria}</Card.Text>
				<Card.Text className="card-medium">Departamento : {departamento}</Card.Text>
				<Card.Text className="card-medium">Disponibles en Inventario: {cantidad}</Card.Text> */}
          <div style={{ display: "flex" }}>
            <Link to="/producto" style={{ textDecoration: "none" }}>
              <button
                className="buttonProducto"
                style={{ color: "#f7f7f7", fontSize: "medium" }}
              >
                <span className="box">Ver producto</span>
              </button>
            </Link>

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipBorrar}
            >
              <button
                className="buttonProducto"
                style={{ color: "#f7f7f7", fontSize: "medium", width: "45px" }}
              >
                <span className="box">
                  <AiOutlineDelete style={{ fontSize: "35px" }} />
                </span>
              </button>
            </OverlayTrigger>
          </div>
        </Card.Body>


      </Card>
    </Col>
  );
};
