
import "bootstrap/dist/css/bootstrap.min.css";


import { ImagenProducto } from "./ImagenProducto";
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
import '../styles/styleArticulos.css'

export const CartaProducto = ({
	nombre,
	precio,
	imagenes,
	descripcion,
	cantidad,
}) => {
	return (
		<>
			<Card className='card'>
				<Card.Body className='card-body'>
					<Card.Title className='card-title'>{nombre}</Card.Title>
					<Card.Text className='card-medium'>Precio: LPS. {precio}</Card.Text>
					<ImagenProducto imagenesProducto={imagenes} className='card-image'/>
					
					<Card.Text>{descripcion}</Card.Text>
					<Card.Subtitle>Disponibles en Inventario: {cantidad}</Card.Subtitle>
				</Card.Body>
			</Card>
		</>
	
	);
};
