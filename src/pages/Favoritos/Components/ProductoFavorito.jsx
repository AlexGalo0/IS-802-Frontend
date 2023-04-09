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

import { useContext } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrarProductoListaDeseos } from "../../../api";

export const ProductoFavorito = React.forwardRef(({ producto }, ref) => {
  const navigate = useNavigate(); //Para redireccion
  const { userAuth } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const handleRedirection = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const renderTooltipQuitar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quitar de lista favoritos
    </Tooltip>
  );

  const idProducto = producto.id_producto.data.toString();
  const mutationEliminarListaDeseos = useMutation({
    mutationFn: (idProducto) => borrarProductoListaDeseos(idProducto, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["productoListaDeseos"]);
    },
  });
  const eliminarListaDeseos = () => {
    mutationEliminarListaDeseos.mutate(idProducto);
  };

  const imagen = JSON.parse(producto.imagenes);
  const postBody = (
    <>
      <Col>
        <Card className="card">
          <Container className="card-container">
            <Card.Img variant="top" src={imagen[0]} className="card-image" />
          </Container>
          <Card.Body className="card-body">
            <Card.Title className="card-title">{producto.nombre}</Card.Title>
            <Card.Text className="card-medium">
              <BsCurrencyDollar
                style={{ marginTop: "-2px", fontSize: "20px" }}
              />{" "}
              Precio : {producto.precio}
            </Card.Text>
            <Card.Text className="card-medium">
              Categoria : {producto.categoria}
            </Card.Text>
            <Card.Text className="card-medium">
              Descripcion : {producto.descripcion}
            </Card.Text>
            <Card.Text className="card-medium">
              Departamento : {producto.departamento}
            </Card.Text>
            <Card.Text className="card-medium">
              Disponibles en Inventario: {producto.cantidad}
            </Card.Text>

            <div style={{ display: "flex" }}>
              <Link
                to={`/producto/${idProducto}`}
                style={{ textDecoration: "none" }}
              >
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
                overlay={renderTooltipQuitar}
              >
                <button
                  className="buttonProducto"
                  style={{
                    color: "#f7f7f7",
                    fontSize: "medium",
                    width: "45px",
                  }}
                  onClick={eliminarListaDeseos}
                >
                  <span className="box">
                    <TiDelete style={{ fontSize: "45px" }} />
                  </span>
                </button>
              </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );

  const content = ref ? (
    <article ref={ref}> {postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return (
    /* content; */ 
	<Container fluid className="container-grid">
      {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
      <article>
        <Row xs={1} md={3} className="g-2" style={{ marginTop: "-20px" }}>
          {content}
        </Row>
      </article>
    </Container>
  );
});

{
  /* <Container fluid className="container-grid" style={{marginTop: '5px', marginLeft: '-8px'}}>
      {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
      <main className="principal">
        <article style={{ margin: 'auto' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              className="Button-back"
              type="submit"
              onClick={handleRedirection}
              style={{ marginTop: "auto" }}
            >
              <BiLeftArrow />
            </button>
            <h1>Tus productos favoritos:</h1>
          </div>

          <Row xs={1} md={3} className='g-4'>
						{content}
					</Row>
        </article>
        <Footers style={{ marginRight: "15px" }}/>
      </main>
    </Container> */
}
