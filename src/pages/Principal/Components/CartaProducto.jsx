import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
	Offcanvas,
	Form,
	Image,
	Carousel,
	OverlayTrigger,
	Tooltip,
	Pagination,
	Card,
} from "react-bootstrap";
import primera from "../../../assets/1.png";
import ejem from "../../../assets/ejem.jpeg";
import logo from "../../../assets/logo.png";
import { ImagenProducto } from "./ImagenProducto";
export const CartaProducto = ({nombre,precio,imagenes,descripcion,cantidad}) => {
	


	return (
		<>
			<Card className='card'>
				<Card.Body className='card-body'>
					<Card.Title className='card-title'>{nombre}</Card.Title>
					<Card.Text className='card-medium'>Precio: LPS. {precio}</Card.Text>
					<ImagenProducto imagenesProducto={imagenes}/>
					{/* <button
						className='buttonProducto'
						style={{ color: "#f7f7f7", fontSize: "medium" }}
					>
						<span class='box'>Ver producto</span>
					</button> */}
					<hr />
					<Card.Text>{descripcion}</Card.Text>
					<Card.Subtitle>Disponibles en Inventario: {cantidad}</Card.Subtitle>

				</Card.Body>
			</Card>
		</>
	
	);
};
