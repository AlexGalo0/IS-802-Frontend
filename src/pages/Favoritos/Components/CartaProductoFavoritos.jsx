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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TiDelete } from "react-icons/ti";
import { borrarProductoListaDeseos } from "../../../api";
export const CartaProductoFavoritos = React.forwardRef(({ producto }, ref) => {
	const queryClient = useQueryClient();
	const token = localStorage.getItem("token");

	const mutationEliminarListaDeseos = useMutation({
		mutationFn: (idProducto) => borrarProductoListaDeseos(idProducto, token),
		onSuccess: () => {
			queryClient.invalidateQueries(["productoListaDeseos"]);
		},
	});
	const eliminarListaDeseos = () => {
		mutationEliminarListaDeseos.mutate(idProducto);
	};
	
	const idProducto= producto.id_producto.data.toString()
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const renderTooltipQuitar = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Quitar de lista favoritos
		</Tooltip>
	);
	const imagen = JSON.parse(producto.imagenes);
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
						<div style={{ display: "flex" }}>
						<Link
							to={`/producto/${idProducto}`}
							style={{ textDecoration: "none" }}
						>
							<button
								className='buttonProducto'
								style={{ color: "#f7f7f7", fontSize: "medium" }}
								onClick={() => {
									scrollToTop();
								}}
							>
								<span className='box'>Ver producto</span>
							</button>
						</Link>
						<OverlayTrigger
							placement='right'
							delay={{ show: 250, hide: 400 }}
							overlay={renderTooltipQuitar}
						>
							<button
								className='buttonProducto'
								style={{
									color: "#f7f7f7",
									fontSize: "medium",
									width: "45px",
								}}
								onClick={eliminarListaDeseos}
							>
								<span className='box'>
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

	return content;
});
