import React, {  useState } from "react";
import {
	Container,
	Card,
	Col,
	OverlayTrigger,
	Tooltip,
	Modal,
	Alert,
} from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { darBajaMiProducto } from "../../../api";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");
export const CartaMisProducto = React.forwardRef(({ producto }, ref) => {
	// const idProducto = producto.id_producto.data.toString();

	socket.on("envio-mensaje", () => {
		console.log("Desde Mis Productos recibi el mensaje");
	});
	const token = localStorage.getItem("token");

	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const [show, setShow] = useState(false);
	const [eliminacionCorrecta, setEliminacionCorrecta] = useState(false);
	const [productoAEliminar, setProductoAEliminar] = useState({});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const renderTooltipBorrar = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Borrar producto
		</Tooltip>
	);
	const imagen = JSON.parse(producto.imagenes);

	const queryClient = useQueryClient();

	const mutationBorrarProducto = useMutation({
		mutationFn: (productoAEliminar) => {
			darBajaMiProducto(token, productoAEliminar.idProducto.data.toString());
		},
		onSuccess: () => {
			setEliminacionCorrecta(true);
			queryClient.invalidateQueries("misProductos");
			queryClient.refetchQueries("misProductos");
			
			setTimeout(() => {
				handleClose();
				setEliminacionCorrecta(false);
			}, 1000);
		},
	});

	const eliminacionProducto = (producto) => {
		mutationBorrarProducto.mutate(producto);
	};

	const postBody = (
		<>
			<Col>
				<Card className='card'>
					<Container className='card-container'>
						<Card.Img variant='top' src={imagen[0]} className='card-image' />
					</Container>
					<Card.Body className='card-body'>
						<Card.Title className='card-title'>{producto.producto}</Card.Title>
						<Card.Text className='card-medium'>
							Lps. {producto.precio}
						</Card.Text>
					
						<Card.Text className='card-medium'>
							Descripcion : {producto.descripcion}
						</Card.Text>
						<Card.Text className='card-medium'>
							Disponibles en inventario: {producto.cantidad}
						</Card.Text>
						<div style={{ display: "flex" }}>
							<OverlayTrigger
								placement='right'
								delay={{ show: 250, hide: 400 }}
								overlay={renderTooltipBorrar}
							>
								<button
									className='buttonProducto'
									style={{
										color: "#f7f7f7",
										fontSize: "medium",
										width: "45px",
									}}
									onClick={() => {
										setProductoAEliminar(producto);
										handleShow();
									}}
								>
									<span className='box'>
										<AiOutlineDelete style={{ fontSize: "35px" }} />
									</span>
								</button>
							</OverlayTrigger>
							<Link to={`/producto/${producto.idProducto.data.toString()}`}>
							<button className='buttonProducto'
									style={{
										color: "#f7f7f7",
										fontSize: "medium",
										width: "150px",
									}}>Ingresar a este producto</button>
              </Link>
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
		<>
			{content}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center", fontSize: "25px" }}>
						¿Seguro que deseas eliminar este producto?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer style={{ margin: "auto" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<div
							style={{ display: "flex", justifyContent: "center", gap: "5px" }}
						>
							<button
								className='buttonGuardar'
								variant='primary'
								onClick={() => {
									eliminacionProducto(productoAEliminar);
								}}
							>
								Eliminar Producto
							</button>

							<button
								variant='secondary'
								onClick={handleClose}
								className='buttonGuardar'
							>
								Cerrar
							</button>
						</div>
						{eliminacionCorrecta ? (
							<Alert variant='success' style={{ marginTop: "10px" }}>
								Se elimino correctamente
							</Alert>
						) : (
							""
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
});
