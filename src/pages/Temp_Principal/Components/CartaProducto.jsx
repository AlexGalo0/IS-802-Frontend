import React, { useEffect, useState } from "react";
import { Container, Accordion, Form, Card, Row, Col } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { Link } from "react-router-dom";

export const CartaProducto = ({
	nombre,
	precio,
	imagenes,

	cantidad,
	nombrecategoria,
	departamento,
}) => {
	// console.log(JSON.parse(product[0].imagenes[0]))
	const [primeraImagen, setPrimeraImagen] = useState("");
	useEffect(() => {
		const primeraImagen = JSON.parse(imagenes);
		setPrimeraImagen(primeraImagen[0]);
	});

	return (
		<Col>
			{/* <Card>
				<Card.Body>
					<Card.Title>{nombre}</Card.Title>
					<Card.Img src={primeraImagen}></Card.Img>
					<Card.Text className='card-medium'>Precio: LPS. {precio}</Card.Text>
					<Card.Text>Categoria : {nombrecategoria}</Card.Text>
					<Card.Text>Departamento : {departamento}</Card.Text>
					<Card.Subtitle>Disponibles en Inventario: {cantidad}</Card.Subtitle>
				</Card.Body>
			</Card> */}

			<Card className="card">
              <Container className="card-container">
                <Card.Img variant="top" src={primeraImagen} className="card-image" />
              </Container>
              <Card.Body className="card-body">
                <Card.Title className="card-title">{nombre}</Card.Title>
                <Card.Text className="card-medium">Precio: lps. {precio}</Card.Text>
				<Card.Text className="card-medium">Categoria : {nombrecategoria}</Card.Text>
				<Card.Text className="card-medium">Departamento : {departamento}</Card.Text>
				<Card.Text className="card-medium">Disponibles en Inventario: {cantidad}</Card.Text>
				<Link to='/construyendo' style={{textDecoration: 'none'}}>
                <button
                  className="buttonProducto"
                  style={{ color: "#f7f7f7", fontSize: "medium" }}
                >
                  <span className="box">Ver producto</span>
                </button>
				</Link>
              </Card.Body>
            </Card>
		</Col>
	);
};
