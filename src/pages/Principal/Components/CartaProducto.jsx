import React, { useEffect, useState } from "react";
import { Container, Accordion, Form, Card, Row, Col } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";

export const CartaProducto = React.forwardRef(({ producto }, ref) => {
	// const [primeraImagen, setPrimeraImagen] = useState("");
	// // useEffect(() => {
	// // 	const primeraImagen = JSON.parse(imagenes);
	// // 	setPrimeraImagen(primeraImagen[0]);
	// // });

	function scrollToTop() {
		window.scrollTo(0, 0);
	  }
	const imagen = JSON.parse(producto.imagenes)
	const postBody = (
		<>
			<Col>
				<Card className='card'>
					<Container className='card-container'>
						<Card.Img variant='top' src={imagen[0]} className='card-image' />
					</Container>
					<Card.Body className='card-body'>
						<Card.Title className='card-title'>{producto.nombre}</Card.Title>
						<Card.Text className='card-medium'>
						Lps. {producto.precio}
						</Card.Text>
						<Card.Text className='card-medium'>
							Categoría : {producto.nombrecategoria}
						</Card.Text>
						<Card.Text className='card-medium'>
							Departamento : {producto.departamento}
						</Card.Text>
						<Card.Text className='card-medium'>
							Disponibles en inventario: {producto.cantidad}
						</Card.Text>
						<Link
							to={`/producto/${producto.idProducto.data}`}
							style={{ textDecoration: "none" }}
						>
							<button
								className='buttonProducto'
								style={{ color: "#f7f7f7", fontSize: "medium" }} onClick={() => { scrollToTop()}}
							>
								<span className='box'>Ver producto</span>
							</button>
						</Link>
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

	return content;
});
