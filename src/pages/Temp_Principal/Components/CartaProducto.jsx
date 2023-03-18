import React, { useEffect, useState } from "react";
import { Container, Accordion, Form, Card, Row, Col } from "react-bootstrap";
export const CartaProducto = ({
	nombre,
	precio,
	imagenes,
	descripcion,
	cantidad,
	nombrecategoria,
}) => {
	// console.log(JSON.parse(product[0].imagenes[0]))
	const [primeraImagen, setPrimeraImagen] = useState("");
	useEffect(() => {
		const primeraImagen= JSON.parse(imagenes)
		setPrimeraImagen(primeraImagen[0]);
	} );

	return (
		<Col>
			<Card>
				<Card.Body>
					<Card.Title>{nombre}</Card.Title>
					<Card.Img src={primeraImagen}></Card.Img>
					<Card.Text className='card-medium'>Precio: LPS. {precio}</Card.Text>
					<Card.Text>Descripcion : {descripcion}</Card.Text>
					<Card.Text>Categoria : {nombrecategoria}</Card.Text>
					<Card.Subtitle>Disponibles en Inventario: {cantidad}</Card.Subtitle>
				</Card.Body>
			</Card>
		</Col>
	);
};