import React from "react";
import { Container,Card, Col } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { Link } from "react-router-dom";

import {Rating} from '../../SobreNosotros/Components/star'

export const CartaProducto = React.forwardRef(({ producto }, ref) => {

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
						<Card.Text className='card-medium'>
							{
								producto.calificacion_vendedor === null ? 'El vendedor no tiene calificación' : 'Calificación del vendedor : ' + producto.calificacion_vendedor
							}
							<Rating rating={/* producto.calificacion_vendedor */ 3} />
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
