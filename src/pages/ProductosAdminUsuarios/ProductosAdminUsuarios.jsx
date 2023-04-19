import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductosUsuarioDNI } from "../../api/sendRequest.api";
import {
	Col,
	Card,
	Container,
	Tooltip,
	OverlayTrigger,
	Modal,
	Button,
	Alert,
} from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
export const ProductosAdminUsuarios = () => {
	const { usuariodni } = useParams();
	const { data: productosUsuario } = useQuery({
		queryKey: ["productosUsuario"],
		queryFn: () => obtenerProductosUsuarioDNI(usuariodni),
	});
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const renderTooltipBorrar = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Borrar producto
		</Tooltip>
	);
	const [show, setShow] = useState(false);
	const queryClient = useQueryClient();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [productoAModificar, setProductoAModificar] = useState();
	const [seEliminoCorrectamente, setSeEliminoCorrectamente] = useState(false);
	const borrarProductoMutation = useMutation({
		mutationFn: () =>
			console.log(
				"Se ejecuto para el producto: ",
				productoAModificar.idProducto.data.toString()
			),
		onSuccess: () => {
			setSeEliminoCorrectamente(true);
			queryClient.invalidateQueries("productosUsuario");
			setTimeout(() => {
				handleClose();
				setSeEliminoCorrectamente(false);
			}, 1000);
		},
	});
	const borrarProducto = (productoABorrar) => {
		borrarProductoMutation.mutate(productoABorrar);
	};
	return (
		<>
			<h1>Productos del usuario con el DNI: {usuariodni} </h1>
			{productosUsuario?.map((producto) => (
				<>
					<Col>
						<Card className='card'>
							<Container className='card-container'>
								<Card.Img
									variant='top'
									src={JSON.parse(producto.imagenes)[0].toString()}
									className='card-image'
								/>
							</Container>
							<Card.Body className='card-body'>
								<Card.Title className='card-title'>
									{producto.nombre}
								</Card.Title>
								<Card.Text className='card-medium'>
									Lps. {producto.precio}
								</Card.Text>
								<Card.Text className='card-medium'>
									Categoría : {producto.categoria}
								</Card.Text>
								<Card.Text className='card-medium'>
									Departamento : {producto.departamento}
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
												handleShow(), setProductoAModificar(producto);
											}}
										>
											<span className='box'>
												<AiOutlineDelete style={{ fontSize: "35px" }} />
											</span>
										</button>
									</OverlayTrigger>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</>
			))}

			{/* 
                      Definicion de Modal de Borrar Productos
      */}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						¿Deseas Borrar el producto : {productoAModificar?.nombre}?{" "}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<button
						variant='primary'
						onClick={() => {
							borrarProducto(productoAModificar?.idProducto.data.toString());
						}}
					>
						Borrar Producto
					</button>
					<button variant='secondary' onClick={handleClose}>
						Cerrar
					</button>
					{seEliminoCorrectamente ? (
						<Alert variant='success'>Se elimino correctamente</Alert>
					) : (
						""
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};
